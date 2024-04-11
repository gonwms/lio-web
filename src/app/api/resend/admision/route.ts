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

// API KEYs
/*
 *RECAPTCHA
 * https://console.cloud.google.com/security/recaptcha
 */
const captcha_secret = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

/*
 *RESEND
 * https://resend.com/
 */
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(request: any): Promise<void | Response> {
  //
  const { captcha, subject, name, email, message }: Request =
    await request.json()
  try {
    // --- RECAPTCHA
    console.log(captcha_secret)
    const captchaTest = await reCAPTCHAcheck(captcha)

    // --- RESEND
    if (captchaTest.success) {
      const data = await resend.emails.send({
        from: "Redterapia.com <admisiones@redterapia.com>",
        reply_to: "contacto@redterapia.com",
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
      return NextResponse.json(data)
    }
  } catch (error) {
    return NextResponse.json(error)
  }
}

// --- RECAPTCHA
// https://console.cloud.google.com/security/recaptcha?hl=es-419&project=testprojects-337400

async function reCAPTCHAcheck(captcha: string) {
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify`
  const verificationData = {
    secret: captcha_secret as string,
    response: captcha,
  }
  const reCAPTCHAResponse = await fetch(verificationURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(verificationData),
  })
  console.log(reCAPTCHAResponse.json())
  return await reCAPTCHAResponse.json()
}
