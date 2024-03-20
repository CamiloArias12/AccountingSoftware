#!/bin/sh
echo "Installing bash..."
apk add bash

echo "Installing dependiencies..."
yarn install

if [ $ENV = "prod" ]; then
  echo "------------ PRODUCTION MODE ------------"
  yarn build
  yarn start
else
  echo "------------ DEVELOPMENT MODE ------------"
  yarn run dev
fi
