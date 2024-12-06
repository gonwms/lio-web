export default function formatDataType(
  type: 'posts' | 'events' | 'docs' | 'products'
) {
  switch (type) {
    case 'posts':
      return { path: 'noticias', ico: '/ico/ico-noticias.svg' }
      break
    case 'events':
      return { path: 'eventos', ico: '/ico/ico-eventos.svg' }
      break
    case 'docs':
      return { path: 'recursos', ico: '/ico/ico-recursos.svg' }
      break
    case 'products':
      return { path: 'tienda', ico: '/ico/ico-tienda.svg' }
      break
    default:
      return { path: '', ico: '' }
  }
}
