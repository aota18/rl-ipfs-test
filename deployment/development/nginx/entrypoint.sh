#!/bin/sh

set -e

set -a
. /config-env/envFile
set +a

printf "\n\tCreating /var/log/nginx...\n\n"
mkdir -p /var/log/nginx

printf "\n\tSubstituting environment variables into nginx config...\n\n"
envsubst \
	'${HOST_IP};' \
	< /config-root/site.conf.template \
	> /etc/nginx/nginx.conf

printf "\n\tLaunching nginx...\n\n"
# cat /etc/nginx/conf.d/default.conf

/usr/sbin/nginx -g "daemon off;"
