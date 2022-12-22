#!/bin/bash

set -e

panic () {
	echo "**************panic error*****[file:${BASH_SOURCE}, line:${BASH_LINENO}]********"
	echo "error: $1"
	exit 1
}

. ./.env
. ./.env-overlay
REPO_DIR=$(pwd)

printf "\n [-] Build start from repo [${REPO_DIR}] \n\n"

arch=$(uname)
if [ "$arch" = "Darwin" ]; then
  if gsed --version > /dev/null; then
    :
  else
    printf "\n [error] sed in MacOS is not same . \n\n"
    printf "\n [sh] brew install gnu-sed \n\n"
    exit 1
  fi
fi

NAME="${1}"

VERSION_SCRIPT="./deployment/update-version.sh"
case "$NAME" in
    # android-preview)
		# ENTRY_SCRIPT="./deployment/build-android-preview.sh"
		# ;;
	web)
		ENTRY_SCRIPT="./deployment/build-web-server.sh"
		;;
    * )
		panic "Unknown Build target($NAME)"
esac

BUILD_SCRIPT_FILE="${REPO_DIR}/${ENTRY_SCRIPT}"

[ -f "${BUILD_SCRIPT_FILE}" ] || panic "No entry script exist at (${BUILD_SCRIPT_FILE})"

TMP_WORKING_DIR="${REPO_DIR}/.tmp-no-git-working"
WORKING_DIR_SOURCE="${TMP_WORKING_DIR}/build/source-sync"
WORKING_DIR_BUILD="${TMP_WORKING_DIR}/build/tmp"


mkdir -p "${WORKING_DIR_SOURCE}" || panic "failed mkdir"
mkdir -p "${WORKING_DIR_BUILD}" || panic "failed mkdir"


printf "\n [-] [Local-Build] sync all files  \n\n"
rsync -a deployment "${WORKING_DIR_SOURCE}"

rsync -a packages/ "${WORKING_DIR_SOURCE}/packages" \
	--exclude "node_modules" \
    --exclude "*.env" \
    --exclude ".env*" \
    --exclude ".DS_Store" \
	--exclude ".gitignore" \

printf "\n [-] [Local-Build] entry script [${BUILD_SCRIPT_FILE}]  \n\n"

cd $WORKING_DIR_SOURCE || panic "Failed to enter dir (${WORKING_DIR_SOURCE})"

GIT_VER_INFO=$(git branch --show-current)
timestamp=$(date +'%Y%m%d-%H%M%S')
export CI_BUILD_REF_NAME="localBuild-${arch}-${timestamp}"
export RELEASE_VER="9.9.9"
export CI_PIPELINE_ID="9999"
export CI_PROJECT_DIR="${WORKING_DIR_SOURCE}"
export WORKING_DIR_BUILD="${WORKING_DIR_BUILD}"

BUILD_VERSION=$(./deployment/sh-lib/get-build-version.sh)

# panic "CHECK VERSION (${BUILD_VERSION})"

"${VERSION_SCRIPT}"

printf "\n [-] Packaging source \n\n"
dpkg-deb --version || panic "Please install dpkg-dev by 'brew install dpkg'"
"${ENTRY_SCRIPT}"
