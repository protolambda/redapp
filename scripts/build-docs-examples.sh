#!/bin/sh

# Build react-example project
cd examples/react-example
# cleanup, if anything is there
rm -rf dist
# Install dependencies, if they are not already there (Travis CI cache)
npm i
# Build the example
npm run build:prod
cd ../..
# Create examples output folder
mkdir -p docs-out/examples/react-example
# Place everything where it needs to be
mkdir docs-out/examples/react-example/static
cp  examples/react-example/dist/bundle.js docs-out/examples/react-example/static/bundle.js
cp  examples/react-example/index.html docs-out/examples/react-example/index.html

