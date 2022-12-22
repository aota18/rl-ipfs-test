#!/bin/bash

set -e
. ./deployment/sh-lib/semver.sh

getReleaseVer() {
    local __resultvar=$1

    local MAJOR=0
    local MINOR=0
    local PATCH=0
    local SPECIAL=""

    local VERSION=$(echo ${CI_BUILD_REF_NAME} | sed 's/release\/v//')
    semverParseInto "${VERSION}" MAJOR MINOR PATCH SPECIAL

    if [[ "${SPECIAL:0:3}" == "-rc" ]]; then
        eval $__resultvar="'${CI_PIPELINE_ID}-${MAJOR}.${MINOR}.${PATCH}.c${SPECIAL:3}'"
    elif [[ "${SPECIAL:0:5}" == "-beta" ]]; then
        eval $__resultvar="'${CI_PIPELINE_ID}-${MAJOR}.${MINOR}.${PATCH}.b${SPECIAL:5}'"
    elif [[ "${SPECIAL:0:3}" == "-hf" ]]; then
        eval $__resultvar="'${CI_PIPELINE_ID}-${MAJOR}.${MINOR}.${PATCH}.${SPECIAL:3}'"
    else
        eval $__resultvar="'${CI_PIPELINE_ID}-${MAJOR}.${MINOR}.${PATCH}'"
    fi
}

# If this is a release branch, use semver but replace the
# special with the pipeline id
if echo "${CI_BUILD_REF_NAME}" | grep -q "^release\/v"; then
    getReleaseVer RELEASE_VER
    echo "${RELEASE_VER}-rel"

elif [[ "${CI_BUILD_REF_NAME}" == "staging/show" ]]; then
    echo "${RELEASE_VER}-staging-show-pipe-${CI_PIPELINE_ID}"

elif echo "${CI_BUILD_REF_NAME}" | grep -q "^master\/v"; then
    echo "${RELEASE_VER}-dev-${CI_PIPELINE_ID}"

else
    echo "${RELEASE_VER}-${CI_BUILD_REF_NAME}-pipe-${CI_PIPELINE_ID}" | sed 's/feature\///'
fi
