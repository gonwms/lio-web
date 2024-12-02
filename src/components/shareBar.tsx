import styles from './shareBar.module.css'

export default function ShareBar({ data }: any) {
  return (
    <div className={styles.share}>
      <p>compartir</p>

      {/* ---------- whatsapp ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              window.location.href + '\n\n¿Viste esto?'
            )}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        WhatsApp
      </button>

      {/* ---------- facebook ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}%0A${encodeURIComponent(data?.attributes?.title)}`,
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
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}%0A&text=${encodeURIComponent(data?.attributes?.title)}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        Twitter
      </button>

      {/* ---------- linkedin ------------- */}
      <button
        onClick={() => {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}%0A${encodeURIComponent(data?.attributes?.title)}`,
            '_blank',
            'noopener,noreferrer'
          )
        }}
      >
        LinkedIn
      </button>

      {/* ---------- email ------------- */}
      <button
        onClick={() =>
          window.open(
            `mailto:?subject=${encodeURIComponent(
              `¿Viste esto? | ${data?.attributes?.title}`
            )}&body=${encodeURIComponent(`Hola!, cómo estás?

Te paso esta nota:  ${data?.attributes?.title.toUpperCase()}
Te dejo el link: 👉 ${window.location.href}

me contás qué te parece!
Saludos`)}`,
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
            `https://t.me/share/url?url=${encodeURIComponent(
              window.location.href
            )}%0A`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        telegram
      </button>

      {/* ---------- whatsapp ------------- */}
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              window.location.href
            )}%0A%0A${encodeURIComponent('¿Viste esto?')}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        WhatsApp
      </button>
    </div>
  )
}
