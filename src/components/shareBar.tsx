import styles from './shareBar.module.css'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function ShareBar({ data }: any) {
  // HANDLERS
  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
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

  const social = [
    { name: 'Whatsapp', action: handleWhatsapp, src: '/social/whatsapp.svg' },
    { name: 'Twitter', action: handleTwitter, src: '/social/twitter.svg' },
    { name: 'Facebook', action: handleFacebook, src: '/social/facebook.svg' },
    { name: 'Copiar link', action: copyLink, src: '/social/link.svg' },
    { name: 'E-mail', action: handleEmail, src: '/social/email.svg' }
    // { name: 'linkedin', action: handleLinkedin, src: '/social/linkedin.svg' },
    // { name: 'telegram', action: handleTelegram, src: '/social/telegram.svg' }
  ]

  return (
    <div className={styles.share}>
      <p>Compartir</p>
      <div className={styles.links}>
        {social.map((item) => {
          return (
            <Tooltip.Provider key={item.name} delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button onClick={item.action}>
                    <img src={item.src} alt={item.name} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className={styles.TooltipContent}
                    sideOffset={5}
                  >
                    {item.name}
                    <Tooltip.Arrow className={styles.TooltipArrow} />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )
        })}
      </div>
    </div>
  )
}
