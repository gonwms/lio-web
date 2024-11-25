/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/editar",
        destination:
          "https://lio-server-production-c17d.up.railway.app/admin/auth/login",
        permanent: true,
      },
      {
        source: "/hola",
        destination: "https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w",
        permanent: true,
      },
      {
        source: "/wsp",
        destination: "https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
