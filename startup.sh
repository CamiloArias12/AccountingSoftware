#!/bin/sh

yarn

cd packages
  cd core
    yarn
    yarn build
    yarn start:prod &

  cd ..
  cd web
    yarn
    yarn build
    yarn start
  cd ..
cd ..

