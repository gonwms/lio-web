"use client"
import { Skeleton } from "@radix-ui/themes"
import styles from "./skeletonGrid.module.scss"

export default function SkeletonGrid({ loading }: { loading?: boolean }) {
  return (
    <div className={styles.skeletonGrid}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton height="310px"></Skeleton>
      <Skeleton height="15px" width="20%"></Skeleton>
      <Skeleton height="22px"></Skeleton>
      <Skeleton height="22px" width="50%"></Skeleton>
    </div>
  )
}
