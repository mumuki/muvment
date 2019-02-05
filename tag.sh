#!/bin/bash

set -e

NEW_VERSION=$1
VERSION_REGEXP='[0-9]+\.[0-9]+\.[0-9]+'
FULL_VERSION_REGEXP="^${VERSION_REGEXP}$"

if [[ ! $NEW_VERSION =~ $FULL_VERSION_REGEXP ]]; then
  echo "First param should be a version like X.X.X"
  exit 1
fi

echo "[Muvment] Updating version..."
sed -i -r "s/VERSION = \"${VERSION_REGEXP}/VERSION = \"${NEW_VERSION}/" gem/lib/muvment/version.rb
sed -i -r "s/\"version\": \"${VERSION_REGEXP}/\"version\": \"${NEW_VERSION}/" package.json

echo "[Muvment] Running tests..."
npm test

echo "[Muvment] Commiting files..."
git commit gem/lib/muvment/version.rb package.json -m "Welcome ${NEW_VERSION}!"

echo "[Muvment] Tagging v$NEW_VERSION..."
git tag "v${NEW_VERSION}"

echo "[Muvment] Pushing..."
git push origin HEAD --tags

echo "[Muvment] Pushed. Travis will do the rest"
