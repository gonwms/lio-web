"use client"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Captcha from "react-google-recaptcha"
import styles from "./form.module.scss"

const initialFormValues = {
  name: "",
  email: "",
  message: "",
  legal_1: true,
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY // https://console.cloud.google.com/security/recaptcha

export default function AdmisionForm() {
  const [formData, setFormData] = useState(initialFormValues)
  const [submitingState, setSubmitingState] = useState<
    "initial" | "pending" | "ok" | "error"
  >("initial")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //------------------------------------------------------------------------------
  // CAPTCHA
  //------------------------------------------------------------------------------

  const captchaRef = useRef<Captcha>(null)
  const onSubmit = async () => {
    const captcha = await captchaRef.current?.executeAsync()
    if (!captcha) {
      console.log("reCAPTCHA test fail")
      return
    }
    // console.log("reCAPTCHA test:", captcha)
    setSubmitingState("pending")
    sendEmail()
  }

  //------------------------------------------------------------------------------
  // EVENTS
  //------------------------------------------------------------------------------
  async function sendEmail() {
    try {
      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      }
      const res = await fetch("api/resend/contact", req)
      // console.log(res)
      if (res.ok) {
        setSubmitingState("ok")
      } else {
        setSubmitingState("error")
      }
    } catch (error) {
      setSubmitingState("error")
      console.error(error)
    }
  }

  //------------------------------------------------------------------------------
  // RENDER
  //------------------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* ----------------------------------- */}
      <label>
        <span>Nombre </span>
        <input
          {...register("name", { required: true })}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? "error" : undefined}
        />
        {errors.name && (
          <small className={styles.error}>Por favor completar este campo</small>
        )}
      </label>
      {/* ----------------------------------- */}
      <label>
        <span>Email </span>
        <input
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? "error" : undefined}
        />
        {errors.email && (
          <small className={styles.error}>
            El correo electronico ingresado no es válido
          </small>
        )}
      </label>
      {/* ----------------------------------- */}
      <label>
        <span>Mensaje </span>
        <textarea
          {...register("message", { required: true })}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className={errors.message ? "error" : undefined}
          rows={5}
        />
        {errors.message && (
          <small className={styles.error}>Por favor completar este campo</small>
        )}
      </label>

      {/* ----------------------------------- */}
      {/* <label className={styles.legal}>
        <input
          type="checkbox"
          onChange={() =>
            setFormData({ ...formData, legal_1: !formData.legal_1 })
          }
          checked={formData.legal_1}
        />
        <span>Acepto recibir notificaciones en mi correo electrónico.</span>
      </label> */}

      {/* ----------------------------------- */}
      <button
        type="submit"
        className={styles.button}
        data-active-cursor
        disabled={submitingState === "pending" || !formData.legal_1}
      >
        {submitingState === "pending" ? "Enviando..." : "Enviar"}
      </button>
      {/* ----------------------------------- */}
      {submitingState === "ok" && (
        <div className={styles.thanksMessage}>Gracias por comunicarte</div>
      )}
      {submitingState === "error" && (
        <div className={styles.errorMessage}>
          Ha ocurrido un error. Intentalo más tarde
        </div>
      )}

      {RECAPTCHA_SITE_KEY && (
        <Captcha
          ref={captchaRef}
          size="invisible"
          sitekey={RECAPTCHA_SITE_KEY}
        />
      )}
    </form>
  )
}
