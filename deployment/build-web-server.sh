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




DIST_BUILD_SRC="${DEST_DIR}/wetribe-web-server"
mkdir -p $DIST_BUILD_SRC || panic "mkdir"

printf "\n [-] rsync production template \n\n"
rsync -a "${CURRENT_DIR}/deployment/production/wt-backend/" "${DIST_BUILD_SRC}/" \
 		--exclude ".gitignore"






DIST_SOURCE_CODE_DIR="${DIST_BUILD_SRC}/opt/wetribe/source"
mkdir -p $DIST_SOURCE_CODE_DIR || panic "mkdir"

printf "\n [-] rsync php source \n\n"
rsync -a "${CURRENT_DIR}/packages/server-php/" "${DIST_SOURCE_CODE_DIR}/server-php/" \
      --exclude "package-lock.json" \
      --exclude "node_modules" \
      --exclude "shared-daemon" \
      --exclude ".gitignore" \
      --exclude "public/dist" \





DIR_JSP_APP="${CURRENT_DIR}/packages/js-app"
cd  $DIR_JSP_APP || panic "cd"
printf "\n [-] build ui framework \n\n"
export BUILD_APP_PATH="ui-framework"
if [ "$(uname)" = "Darwin" ]; then
	yarn install
else
	npm install
fi
npm run ui-build
PHP_PUBLIC_DIST_DIR="${DIST_SOURCE_CODE_DIR}/server-php/public/dist"
if [ -d "$PHP_PUBLIC_DIST_DIR" ]; then
	rm -rf $PHP_PUBLIC_DIST_DIR
fi
cp -rf "${DIR_JSP_APP}/react-app/${BUILD_APP_PATH}/build" "${PHP_PUBLIC_DIST_DIR}"

printf "\n [-] rsync js server source \n\n"
declare -a JS_SRC_FILES=( \
    'app.prod.config.js' \
    'package.json' \
    'server' \
    'migrations' \
    'data' \
    'core' \
    'napi' \
)
DST_SERVER_JS_ROOT="${DIST_BUILD_SRC}/opt/wetribe/source/js-app"
mkdir -p $DST_SERVER_JS_ROOT || panic "mkdir"
for f in ${JS_SRC_FILES[@]}; do
    fullPathSrc="${DIR_JSP_APP}/${f}"
	if [ -f "${fullPathSrc}" ]; then
		cp -f "$fullPathSrc" "${DST_SERVER_JS_ROOT}/"
	elif [ -d "${fullPathSrc}" ]; then
		cp -rf "$fullPathSrc" "${DST_SERVER_JS_ROOT}/"
	else
		panic "Invalid js file path (${fullPathSrc})"
	fi
done

printf "\n [-] build js daemon \n\n"
if [ "$(uname)" = "Darwin" ]; then
	docker run \
	    --rm \
	    -v "${DST_SERVER_JS_ROOT}:/source" \
	    --entrypoint="/bin/sh" \
	    frontmono/node:14.15.5-alpine-python \
		-c "printf \"\\n\\t[-] Running js app build\\n\\n\" \
			&& cd /source \
			&& ls -all \
			&& npm install --only=prod \
			&& node --version"
else
  	cd $DST_SERVER_JS_ROOT || panic "cd error ($DST_SERVER_JS_ROOT)"
	npm install --only=prod
fi

printf "\n [-] copy android file \n\n"
ANDROID_DIST_DIR="${DIST_BUILD_SRC}/opt/wetribe/source/server-php/public/dist/apk"
mkdir -p "${ANDROID_DIST_DIR}" || panic "mkdir failed"
ANDROID_APK_LEGACY="${ANDROID_DIST_DIR}/legacy-${RELEASE_VER}.${CI_PIPELINE_ID}.apk"
ANDROID_APK_RN="${ANDROID_DIST_DIR}/rn-${RELEASE_VER}.${CI_PIPELINE_ID}.apk"

#cp -f "${CURRENT_DIR}/artifacts/android-dev-preview-debug.apk" "${ANDROID_APK_LEGACY}"
cp -f "${CURRENT_DIR}/artifacts/android-rn-preview-release.apk" "${ANDROID_APK_RN}"

ls -all "${DEST_DIR}"
(cd "${DEST_DIR}" && time(dpkg-deb --build wetribe-web-server))
DEB_FILE_NAME="${DEST_DIR}/wetribe-web-server.deb"


printf "\n [-] Build Success. Deploy file on [${DEB_FILE_NAME}] \n\n"

# restore current
cd $CURRENT_DIR


BUILD_VERSION=$(./deployment/sh-lib/get-build-version.sh)
yyyymm=$(date +'%Y%m')
dd=$(date +'%d')
RESULT_S3_URL="s3://we-dev-harry/app-pkgs/${yyyymm}/${dd}/backend-${BUILD_VERSION}.deb"
printf "\n [-] target s3 url [s3 cp ${DEB_FILE_NAME} ${RESULT_S3_URL}] \n\n"
aws s3 cp "${DEB_FILE_NAME}" "${RESULT_S3_URL}"




mkdir -p artifacts/
cp -f "${DEB_FILE_NAME}" artifacts/

printf "\n [-] [How to Deploy? Copy deb file in cloud server]: [ aws s3 cp ${RESULT_S3_URL} ./ ] \n\n"
echo "aws s3 cp ${RESULT_S3_URL} ./" > artifacts/link.txt
