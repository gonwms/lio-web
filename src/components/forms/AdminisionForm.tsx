import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Captcha from 'react-google-recaptcha'

import Button from '../button/Button'

import styles from './form.module.scss'

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

const initialFormValues = {
  name: '',
  email: '',
  message: '',
  legal_1: false,
  legal_2: false,
}

export default function AdmisionForm() {
  const [formData, setFormData] = useState(initialFormValues)
  const [submitingState, setSubmitingState] = useState<'initial' | 'pending' | 'ok' | 'error'>('initial')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //---- CAPTCHA
  const captchaRef = useRef<Captcha>(null)
  const onSubmit = async () => {
    const captcha = await captchaRef.current?.executeAsync()
    if (!captcha) {
      console.log('reCAPTCHA test fail')
      return
    }
    setSubmitingState('pending')
    sendEmail(captcha)
  }

  // ---- EVENTS
  async function sendEmail(captcha: string) {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captcha: captcha }),
      }
      const res = await fetch('api/resend/admision', req)
      if (res.ok) {
        setSubmitingState('ok')
      } else {
        setSubmitingState('error')
      }
    } catch (error) {
      setSubmitingState('error')
      console.error(error)
    }
  }

  //--- RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* ----------------------------------- */}
      <label>
        <span>Nombre </span>
        <input
          {...register('name', { required: true })}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'error' : undefined}
        />
        {errors.name && <small className={styles.error}>Por favor completar este campo</small>}
      </label>
      {/* ----------------------------------- */}
      <label>
        <span>Email </span>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? 'error' : undefined}
        />
        {errors.email && <small className={styles.error}>El correo electronico ingresado no es válido</small>}
      </label>
      {/* ----------------------------------- */}
      <label>
        <span>días</span>
        <select name="" id="" multiple>
          <option value="lunes">lunes</option>
          <option value="martes">martes</option>
          <option value="miercoles">miercoles</option>
          <option value="jueves">jueves</option>
          <option value="viernes">viernes</option>
          <option value="sábado">sábado</option>
          <option value="domingo">domingo</option>
        </select>
      </label>
      {/* ----------------------------------- */}
      <label>
        <span>Mensaje </span>
        <textarea
          {...register('message', { required: true })}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={errors.message ? 'error' : undefined}
          rows={5}
        />
        {errors.message && <small className={styles.error}>Por favor completar este campo</small>}
      </label>

      {/* ----------------------------------- */}
      <label className={styles.legal}>
        <input type="checkbox" onChange={() => setFormData({ ...formData, legal_1: !formData.legal_1 })} checked={formData.legal_1} />
        <span>Acepto recibir notificaciones en mi correo electrónico.</span>
      </label>
      {/* ----------------------------------- */}
      <label className={styles.legal}>
        <input type="checkbox" onChange={() => setFormData({ ...formData, legal_2: !formData.legal_2 })} checked={formData.legal_2} />
        <span>
          Comprendo que los datos compartidos son manejados con absoluta confidencialidad. Nuestra práctica sigue rigurosamente el Código de
          ética establecido por la asociación de psicólogos de la UBA y UNC, así como las estrictas normativas de protección de datos del
          GDPR.
        </span>
      </label>

      {/* ----------------------------------- */}
      <button
        type="submit"
        className={styles.button}
        data-active-cursor
        disabled={submitingState === 'pending' || !formData.legal_1 || !formData.legal_2}
      >
        {submitingState === 'pending' ? 'Enviando...' : 'Enviar'}
      </button>
      {/* ----------------------------------- */}
      {submitingState === 'ok' && <div className={styles.thanksMessage}>Gracias por comunicarte</div>}
      {submitingState === 'error' && <div className={styles.errorMessage}>Ha ocurrido un error. Intentalo más tarde</div>}

      {RECAPTCHA_SITE_KEY && <Captcha ref={captchaRef} size="invisible" sitekey={RECAPTCHA_SITE_KEY} />}
    </form>
  )
}
