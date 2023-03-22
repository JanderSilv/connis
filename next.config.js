/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // TODO: removes test domains
    domains: ['lh3.googleusercontent.com', 'picsum.photos', 'embrapii.org.br', 'www.senaicimatec.com.br'],
  },
}

module.exports = nextConfig
