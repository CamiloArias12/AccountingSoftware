#!/bin/sh

yarn

cd packages
  cd react-date-picker
   yarn 
   yarn build &
   cd ..
  cd core
    yarn
    yarn build
    yarn start:prod & 
  cd ..
  cd web 
    yarn
    yarn build
    yarn start -p 3001 
  cd ..
cd ..

