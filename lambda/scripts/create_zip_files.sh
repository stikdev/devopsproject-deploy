#!/bin/sh

cd "$(dirname "$0")/.."

echo "Building JavaScript Lambda functions"
$(npm bin)/webpack

echo "Building video_render_coordinator.zip"
cd dist ; zip -u -r -9 -v wombat_roar.zip wombat_roar.js ; cd ..
