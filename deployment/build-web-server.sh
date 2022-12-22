#!/bin/bash

set -e

[[ -z "${CI_PROJECT_DIR}" ]] && echo "CI_PROJECT_DIR not specified... exiting" && exit 1
[[ "$(uname)" = "Darwin" ]] && [[ -z "$WORKING_DIR_BUILD" ]] && echo "WORKING_DIR_BUILD not specified... exiting" && exit 1

CURRENT_DIR=$(pwd)


panic () {
	echo "**************panic error*****[file:${BASH_SOURCE}, line:${BASH_LINENO}]********"
	echo "error: $1"
	exit 1
}

TEMP_FILES=( )
TEMP_DIRS=( )
CURRENT_DIR="$(pwd)"
cleanup() {
  cd "${CURRENT_DIR}"
  rm -f "${TEMP_FILES[@]}"
  rm -rf "${TEMP_DIRS[@]}"
}
trap cleanup 0

# If any errors occur, report them and exit the script
error() {
  local script="$0"
  local parent_lineno="$1"
  local message="$2"
  local code="${3:-1}"
  if [[ -n "$message" ]] ; then
    echo "Error in ${script} on or near line ${parent_lineno}: ${message}; exiting with status ${code}"
  else
    echo "Error in ${script} on or near line ${parent_lineno}; exiting with status ${code}"
  fi
  exit "${code}"
}
trap 'error ${LINENO}' ERR

# Create a temporary folder to hold the built files
if [ "$(uname)" = "Darwin" ]; then
  DEST_DIR="${WORKING_DIR_BUILD}/dist-backend"
  mkdir -p $DEST_DIR
  #TEMP_DIRS+=( "${DEST_DIR}" )
else
  DEST_DIR=$(mktemp -d)
  TEMP_DIRS+=( "${DEST_DIR}" )
fi

DIST_BUILD_SRC="${DEST_DIR}/redletter-final"
mkdir -p $DIST_BUILD_SRC || panic "mkdir"

printf "\n [-] rsync production template \n\n"
rsync -a "${CURRENT_DIR}/deployment/production/redletter/" "${DIST_BUILD_SRC}/" \
 		--exclude ".gitignore"


DIST_SOURCE_CODE_DIR="${DIST_BUILD_SRC}/opt/redletter/source"
mkdir -p $DIST_SOURCE_CODE_DIR || panic "mkdir"


DIR_REACT_APP="${CURRENT_DIR}/packages/react-frontend"
cd $DIR_REACT_APP || panic "cd"
printf "\n [-] build ui app \n\n"
if [ "$(uname)" = "Darwin" ]; then
	npm install
  npm run build
  echo "ui build done"
else
  panic "todo in linux"
	npm install
fi
cp -rf "${DIR_REACT_APP}/build" "${DIST_SOURCE_CODE_DIR}/ui-bundle"


DIR_BACKEND_APP="${CURRENT_DIR}/packages/nodejs-backend"
cd $DIR_BACKEND_APP || panic "cd"
printf "\n [-] build backend app \n\n"
if [ "$(uname)" = "Darwin" ]; then
  rm -rf package-lock.json
	# docker run \
	#     --rm \
	#     -v "${DIR_BACKEND_APP}:/source" \
	#     --entrypoint="/bin/sh" \
	#     node:16-slim \
	# 	-c "printf \"\\n\\t[-] Running js app build\\n\\n\" \
	# 		&& cd /source \
	# 		&& ls -all \
	# 		&& npm install --only=prod \
  #     && npm run build
	# 		&& node --version"
  # echo "backend build done"
else
  panic "todo in linux"
	npm install
fi
cp -rf "${DIR_BACKEND_APP}" "${DIST_SOURCE_CODE_DIR}/backend-bundle"


ls -all "${DEST_DIR}"

(cd "${DEST_DIR}" && time(dpkg-deb --build redletter-final))
DEB_FILE_NAME="${DEST_DIR}/redletter-final.deb"


printf "\n [-] Build Success. Deploy file on [${DEB_FILE_NAME}] \n\n"

# restore current
cd $CURRENT_DIR


BUILD_VERSION=$(./deployment/sh-lib/get-build-version.sh)
yyyymm=$(date +'%Y%m')
dd=$(date +'%d')
RESULT_S3_URL="s3://we-dev-harry/app-pkgs/${yyyymm}/${dd}/backend-${BUILD_VERSION}.deb"
printf "\n [-] target s3 url [s3 cp ${DEB_FILE_NAME} ${RESULT_S3_URL}] \n\n"
# aws s3 cp "${DEB_FILE_NAME}" "${RESULT_S3_URL}"

# panic "todo"

mkdir -p artifacts/
cp -f "${DEB_FILE_NAME}" artifacts/

printf "\n [-] [How to Deploy? Copy deb file in cloud server]: [ aws s3 cp ${RESULT_S3_URL} ./ ] \n\n"
echo "aws s3 cp ${RESULT_S3_URL} ./" > artifacts/link.txt
