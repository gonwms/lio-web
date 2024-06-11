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
      <div style={{ height: "15px", width: "20%" }}></div>
      <div style={{ height: "22px" }}></div>
      <div style={{ height: "22px", width: "50%" }}></div>
    </div>
  )
}
