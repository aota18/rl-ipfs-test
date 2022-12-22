#!/bin/bash
set -e

APP_VERSION=$(./deployment/sh-lib/get-build-version.sh)
echo "apply patched with version [${APP_VERSION}]"

SED="sed"
if [ "$(uname)" = "Darwin" ]; then
  SED="gsed"
fi

# Debian Package
$SED -i "s/##version##/${APP_VERSION}/" deployment/production/wt-backend/DEBIAN/control
$SED -i "s/##version##/${APP_VERSION}/" packages/react-frontend/src/components/desktop/global-components/footer-v2.js
