"use client"
import React from "react"
import DOMPurify from "isomorphic-dompurify"

interface props {
  content: string
  id: number
}

const HTMLRenderer = ({ content, id }: props) => {
  const sanitizedHTML = DOMPurify.sanitize(content)
  const finalHTML = sanitizedHTML
    // replace h6, h5, h4, h3, h2, h1
    .replace(/<h6>/g, "<b>")
    .replaceAll("<p>&nbsp;</p>", "")
    .replaceAll("<p>&nbsp;</p>", "")
    .replace(/<h5>/g, "<strong>")
    .replace(/<h4>/g, "<h6>")
    .replace(/<h3>/g, "<h5>")
    .replace(/<h2>/g, "<h4>")
    .replace(/<h1>/g, "<h3>")
    .replace(/<a /g, '<a target="_blank" ')
    // change images to webp name and extension
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*>/g, (match, url) => {
      const path = url.substring(0, url.lastIndexOf("/") + 1)
      const filename = url.substring(url.lastIndexOf("/") + 1)
      const newFilename =
        "xl_webp_" + filename.replace(/\.(png|jpe?g|gif|webp|avif)$/i, ".webp")
      const newUrl = path + newFilename
      return `<img src="${newUrl}">`
    })
    // replace <pre><code> por html *esto no se usa. no vale la pena. Es muy dificil darle estilos
    .replace(
      /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
      (match, encodedContent) => {
        // Decodificar el contenido HTML dentro de <pre><code>
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = encodedContent // Decodifica entidades HTML (&lt;, &gt;)
        const decodedHTML = tempDiv.textContent || tempDiv.innerText

        // Retorna el contenido decodificado como HTML funcional
        return decodedHTML
      }
    )

  return <div dangerouslySetInnerHTML={{ __html: finalHTML }} />
}

export default HTMLRenderer
