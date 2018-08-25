#!/bin/sh

rm -rf docs-out

# Generate docs
./node_modules/.bin/esdoc

# Add favicon
cp scripts/favicon.ico docs-out/

# Add CNAME for github domain resolution
cp scripts/CNAME docs-out/

# Make sure the docs are not interpreted as a default Jekyll github pages site.
touch docs-out/.nojekyll

