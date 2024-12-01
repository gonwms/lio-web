import styles from './shareBar.module.css'

export default function ShareBar(data: any) {
  return (
    <div className={styles.share}>
      <p>compartir</p>
      {/* ---------- facebook ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${data?.attributes?.title} ${window.location.href}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        Facebook
      </button>

      {/* ---------- twitter ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${data?.attributes?.title}&url=${window.location.href}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        Twitter
      </button>

      {/* ---------- whatsapp ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?text=${
              window.location.href + '\n¿Viste esto?'
            }`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        WhatsApp
      </button>

      {/* ---------- linkedin ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${data?.attributes?.title} ${window.location.href}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        LinkedIn
      </button>

      {/* ---------- email ------------- */}
      <button
        onClick={() =>
          window.open(
            `mailto:?subject=¿Viste esto? | ${data?.attributes?.title}&body=
						Hola!, cómo estás?
						
						Te paso esta nota ${data?.attributes?.title}
						Te dejo el link:
						${window.location.href}
						
						Cualquier cosa, ¡me contás qué te parece!`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        email
      </button>

      {/* ---------- telegram ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://t.me/share/url?url=${window.location.href}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        telegram
      </button>
    </div>
  )
}
