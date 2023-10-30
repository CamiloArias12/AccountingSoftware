/** @type {import('next').NextConfig} */
 
const nextEnv = require('@next/env');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ 
  path: envPath
});
module.exports = {
env: {
    API_ENDPOINT: process.env.API_ENDPOINT
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
   webpack: (config, { isServer }) => {
    // Add the GraphQL loader rule for both client and server bundles
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    });

    // Return the updated Webpack configuration
    return config;
  },
}

