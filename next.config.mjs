!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // TODO: removes test domains
    domains: ['lh3.googleusercontent.com', 'picsum.photos', 'embrapii.org.br', 'www.senaicimatec.com.br'],
  },
}

export default nextConfig
