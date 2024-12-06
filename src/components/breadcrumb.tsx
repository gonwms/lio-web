'use client'
import Link from 'next/link'
import styles from './breadcrumb.module.css'
interface props {
  type: 'eventos' | 'noticias' | 'recursos' | 'tienda'
}
export default function Breadcrumb({ type }: props) {
  return (
    <div className={styles.breadcrumb}>
      <>
        <Link href="/">LIO </Link>
        <Link className={styles.link} href={`/${type}`}>
          {type}
        </Link>
      </>
    </div>
  )
}
