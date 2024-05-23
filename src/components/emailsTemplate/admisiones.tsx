import * as React from "react"

interface EmailTemplateProps {
  name: string
  subject: string
  message: string
}

export const EmailTemplateAdmisiones: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name, subject, message }) => (
  <html lang="es-ES">
    <body style={{ background: "red" }}>
      <p>Hola {name}</p>
      <p>Recibimos tu mensaje:{subject}</p>
      <i>{message}</i>
      <p>Saludos</p>
      <img src="/public/lio-logo.svg" alt="" />
    </body>
  </html>
)
export const EmailTemplateAdmisionesText = ({
  name,
  subject,
  message,
}: EmailTemplateProps): string =>
  `Hola ${name} recibimos tu mensaje: ${subject}. "${message}" - Saludos`
