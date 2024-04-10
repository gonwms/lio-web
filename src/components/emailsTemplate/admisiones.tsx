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
      <h2>Ha {name}</h2>
      <p>recibimos tu mensaje:{subject}</p>
      <i>{message}</i>
      <p>Saludos</p>
    </body>
  </html>
)
export const EmailTemplateAdmisionesText = ({
  name,
  subject,
  message,
}: EmailTemplateProps): string =>
  `Hola ${name} recibimos tu mensaje: ${subject}. "${message}" - Saludos`
