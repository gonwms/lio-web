export default function formatDataType(type: string) {
  switch (type) {
    case "posts":
      return { path: "noticias", ico: "/ico-noticias.svg" }
      break
    case "events":
      return { path: "eventos", ico: "/ico-eventos.svg" }
      break
    case "docs":
      return { path: "recursos", ico: "/ico-recursos.svg" }
      break
    case "products":
      return { path: "tienda", ico: "/ico-tienda.svg" }
      break
    default:
      return { path: "", ico: "" }
  }
}
