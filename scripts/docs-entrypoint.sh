#!/bin/bash

cd apps/docs;
node  -e "const { configureRuntimeEnv } = require('next-runtime-env/build/configure'); configureRuntimeEnv();"
cd ../..;

NODE_OPTIONS=--no-node-snapshot HOSTNAME=0.0.0.0 PORT=3000 node apps/docs/server.js;