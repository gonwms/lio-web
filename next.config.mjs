/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // EDITOR
      {
        source: '/eDit4r_',
        destination:
          'https://lio-server-production-c17d.up.railway.app/admin/auth/login',
        permanent: true
      },
      // sitemap
      // {
      //   source: '/sitemap',
      //   destination:
      //     'https://lio-server-production-c17d.up.railway.app/api/sitemap/index.xml',
      //   permanent: true
      // },

      // CONTACTS
      {
        source: '/hola',
        destination: 'https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w',
        permanent: true
      },
      {
        source: '/wsp',
        destination: 'https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w',
        permanent: true
      }
    ]
  }
}

export default nextConfig
