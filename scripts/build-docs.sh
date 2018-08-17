#!/bin/sh

# Generate docs
./node_modules/.bin/esdoc

# Add favicon
cp scripts/favicon.ico docs/

# Add CNAME for github domain resolution
cp scripts/CNAME docs/

# Make sure the docs are not interpreted as a default Jekyll github pages site.
touch docs/.nojekyll

