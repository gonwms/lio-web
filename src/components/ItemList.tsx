import "server-only"

import { Grid } from "@radix-ui/themes"
// import { Row, Section } from "@/components/customTags/CustomTags"
import classNames from "classnames"
import styles from "./Itemslist.module.scss"
import { getDocs, getPosts } from "@/actions"
import InfiniteScroll from "./InfiniteScroll"
import { Suspense } from "react"
import ItemCard from "./itemCard"

interface propsType {
  req: any
}

export default async function ItemList({ req }: propsType) {
  // ------------------------------------------
  // fetch data
  // ------------------------------------------
  const { data, error, meta } = await getDocs(req)

  // ------------------------------------------
  // Render
  // ------------------------------------------
  if (error) {
    return <h1>{error.message}</h1>
  }
  if (data?.length === 0) {
    return <h1>no hay resultados</h1>
  }
  return (
    <div>
      <div className={classNames(styles.filters)}>
        <span>Ordenar por</span>
        <span>Categorias</span>
        <span>Buscar</span>
      </div>
      <div className={classNames(styles.gridCollection)}>
        {data?.map((item: any) => {
          return <ItemCard key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}
