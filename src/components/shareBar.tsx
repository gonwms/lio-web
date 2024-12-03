import styles from './shareBar.module.css'

export default function ShareBar({ data }: any) {
  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}%0A${encodeURIComponent(data?.attributes?.title)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }
  function handleTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}%0A&text=${encodeURIComponent(data?.attributes?.title)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }
  function handleLinkedin() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}%0A${encodeURIComponent(data?.attributes?.title)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function handleTelegram() {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}%0A`,
      '_blank',
      'noopener,noreferrer'
    )
  }
  function handleWhatsapp() {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        window.location.href + '\n\n¿Viste esto?'
      )}`,
      '_blank',
      'noopener,noreferrer'
    )
  }
  function handleEmail() {
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
  function copyLink() {
    const url = window.location.href
    navigator.clipboard.writeText(url)
  }

  return (
    <div className={styles.share}>
      <p>Compartir</p>
      <div className={styles.links}>
        <button onClick={handleWhatsapp}>
          <img src="/social/whatsapp.svg" alt="whatsapp" />
        </button>
        <button onClick={handleTwitter}>
          <img src="/social/twitter.svg" alt="twitter" />
        </button>
        <button onClick={handleFacebook}>
          <img src="/social/facebook.svg" alt="facebook" />
        </button>
        {/* <button onClick={handleLinkedin}>
        <img src="/social/linkedin.svg" alt="linkedin" />
      </button> */}
        <button onClick={handleTelegram}>
          <img src="/social/telegram.svg" alt="telegram" />
        </button>
        <button onClick={copyLink}>
          <img src="/social/link.svg" alt="link" />
        </button>
        <button onClick={handleEmail}>
          <img src="/social/email.svg" alt="email" />
        </button>
      </div>
    </div>
  )
}
