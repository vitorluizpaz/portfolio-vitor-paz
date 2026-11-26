#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist
cp index.html styles.css script.js projects.json favicon.svg dist/
