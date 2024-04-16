import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  EmailTemplateAdmisiones,
  EmailTemplateAdmisionesText,
} from "@/components/emailsTemplate/admisiones"

export const runtime = "edge"
export const dynamic = "force-dynamic"

interface Request {
  captcha: string
  name: string
  email: string
  subject: string
  message: string
}

const captcha_secret = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY // https://console.cloud.google.com/security/recaptcha
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY) // https://resend.com/

export async function POST(request: any): Promise<void | Response> {
  const { captcha, subject, name, email, message }: Request =
    await request.json()
  //
  try {
    const { data, error } = await resend.emails.send({
      from: "contacto@perci.ar <contacto@perci.ar>",
      reply_to: "contacto@perci.ar",
      to: email,
      subject: "Confirmación de solicitud de admisión",
      text: EmailTemplateAdmisionesText({
        name: name,
        subject: subject,
        message: message,
      }),
      react: EmailTemplateAdmisiones({
        name: name,
        subject: subject,
        message: message,
      }),
    })
    if (data) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json(error)
    }
    // }
  } catch (error) {
    return NextResponse.json(error)
  }
}
