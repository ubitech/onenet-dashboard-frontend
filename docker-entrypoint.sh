#!/usr/bin/env sh
set -eu

export NODE_PORT=32767
export BACKEND_HOST=onenet
export BACKEND_PORT=8080
envsubst '${BACKEND_HOST} ${BACKEND_PORT} ${NODE_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"