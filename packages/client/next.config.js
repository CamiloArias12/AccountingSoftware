/** @type {import('next').NextConfig} */
 
module.exports = {
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

