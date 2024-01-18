#!/bin/sh

yarn

cd packages
  cd core
    yarn
   # yarn build
    #yarn start:prod &
    yarn dev &

  cd ..
  cd web 
    yarn
   # yarn build
    yarn dev
  cd ..
cd ..

