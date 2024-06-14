"use client"
import styles from "./skeleton.module.scss"

export function SkeletonGrid({ count }: { count: number }) {
  const items = Array.from({ length: count })
  return (
    <div className={styles.skeletonGrid}>
      <>
        {items.map((item, index) => {
          return <SkeletonCard key={index} />
        })}
      </>
    </div>
  )
}

export function SkeletonFeatured({ count }: { count: number }) {
  const items = Array.from({ length: count })
  return (
    <div className={styles.skeletonFeatured}>
      {items.map((item, index) => {
        return <SkeletonCard key={index} />
      })}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImageBox}></div>
      <div style={{ height: "0.8em", width: "30%" }}></div>
      <div style={{ height: "1.2em" }}></div>
      <div style={{ height: "1.2em", width: "50%" }}></div>
    </div>
  )
}
