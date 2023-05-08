/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.alias['graphql'] = 'graphql'
    return config
  }
}

module.exports = nextConfig
