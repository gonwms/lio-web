/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/editar",
        destination: "https://lio-server-production.up.railway.app/admin",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
