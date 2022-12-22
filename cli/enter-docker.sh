#!/bin/bash

panic () {
	echo "**************panic error*****[file:${BASH_SOURCE}, line:${BASH_LINENO}]********"
	echo "error: $1"
	exit 1
}

APP_NAME="$1"
printf "\n Entering ($APP_NAME) .....\n\n"
case "$APP_NAME" in
  php|mysql)
    docker-compose exec "$APP_NAME" /bin/bash
    ;;
  nginx|js-app)
    docker-compose exec "$APP_NAME" /bin/sh
    ;;
  * )
    panic "no app assigned for enter (${APP_NAME})"
    ;;
esac
