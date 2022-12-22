#!/bin/bash

panic () {
	echo "**************panic error*****[file:${BASH_SOURCE}, line:${BASH_LINENO}]********"
	echo "error: $1"
	exit 1
}

REPO_DIR=$(pwd)

CHECK_FILE_NAME="${REPO_DIR}/cli-dev/start.sh"

[ -f $CHECK_FILE_NAME ] || panic "invalid start point. no file exist at (${CHECK_FILE_NAME})"

set -e

. ./.env
. ./.env-overlay # ENV Overlay must exist

set +e


[ -z "${CURRENT_DEV_HOST_IP}" ] && panic "env check"
[ -z "${ASSET_NO_CACHE}" ] && panic "missing env"

[ -z "${NET_SUBNET}" ] && panic "missing env"
[ -z "${NET_IP_NGINX}" ] && panic "missing env"
[ -z "${NET_IP_PHP}" ] && panic "missing env"
[ -z "${NET_IP_MYSQL}" ] && panic "missing env"

[ -z "${NET_PORT_NGINX}" ] && panic "missing env"
[ -z "${NET_PORT_MYSQL_SERVER}" ] && panic "missing env"


# for PHP Laravel
[ -z "${APP_NAME}" ] && panic "missing env"
[ -z "${APP_ENV}" ] && panic "missing env"

[ -z "${APP_KEY}" ] && panic "missing env"
[ -z "${APP_PATH_STORAGE}" ] && panic "missing env"
[ -z "${APP_PATH_BOOTSTRAP}" ] && panic "missing env"

# for mysql
[ -z "${DB_CONNECTION}" ] && panic "missing env"
[ -z "${DB_MYSQL_HOST}" ] && panic "missing env"
[ -z "${DB_MYSQL_PORT}" ] && panic "missing env"
[ -z "${DB_MYSQL_SCHEMA}" ] && panic "missing env"
[ -z "${DB_MYSQL_USER}" ] && panic "missing env"
[ -z "${DB_MYSQL_PASS}" ] && panic "missing env"

# session
[ -z "${SESSION_CONNECTION}" ] && panic "missing env"
[ -z "${SESSION_DRIVER}" ] && panic "missing env"
[ -z "${SESSION_LIFETIME}" ] && panic "missing env"
[ -z "${SESSION_COOKIE}" ] && panic "missing env"
[ -z "${SESSION_DOMAIN}" ] && panic "missing env"


export CURRENT_DEV_HOST_IP="${CURRENT_DEV_HOST_IP}"

TMP_DIR_ROOT="${REPO_DIR}/.tmp-no-git-working"
declare -a CACHE_FOLDERS=( \
	'docker' \
	'docker/php-tmp' \
	'docker/php-tmp/bootstrap' \
  'docker/php-tmp/bootstrap/cache' \
  'docker/php-tmp/public' \
  'docker/php-tmp/public/temp' \
  'docker/php-tmp/public/upload' \
  'docker/php-tmp/storage' \
  'docker/php-tmp/storage/app' \
  'docker/php-tmp/storage/app/public' \
  'docker/php-tmp/storage/framework' \
  'docker/php-tmp/storage/framework/cache' \
  'docker/php-tmp/storage/framework/cache/data' \
  'docker/php-tmp/storage/framework/sessions' \
  'docker/php-tmp/storage/framework/testing' \
  'docker/php-tmp/storage/framework/views' \
	'docker/js-daemon' \
	'docker/js-daemon/tmp-upload' \
	'docker/upload' \
	'daemon-tmp' \
	'daemon-tmp/tmp-upload'
)


mkdir -p "$TMP_DIR_ROOT" || panic "Failed to create dir at (${TMP_DIR_ROOT})"

for folder in ${CACHE_FOLDERS[@]}; do
    tmp_folder="${TMP_DIR_ROOT}/${folder}"
    if [ -d "${tmp_folder}" ]; then
      #echo "folder already exists: ${tmp_folder}"
	  :
    else
      echo "create folder: ${tmp_folder}"
      mkdir -p "${tmp_folder}"
    fi
    chmod -R 777 "${tmp_folder}"
done

# panic "STOP"
declare -a EMPTY_FILES=( \
	# 'daemon/package-lock.json'
)
for a in ${EMPTY_FILES[@]}; do
	file="${TMP_DIR_ROOT}/${a}"
    if [ -f "${file}" ]; then
      :
    else
      touch $file
    fi
done


APP_NAME="$1"
printf "\n running ($APP_NAME) .....\n\n"
case "$APP_NAME" in
	docker)
		#docker-compose config
		docker-compose up
		;;
	api)
		cd packages/all-js || panic "Failed to CD"
		npm start
		;;
	* )
		panic "no app assigned for enter (${APP_NAME})"
		;;
esac
