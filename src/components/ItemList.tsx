import "server-only"

import classNames from "classnames"
import styles from "./Itemslist.module.scss"
import { getAllResource } from "@/actions"
import ItemCard from "./itemCard"

interface propsType {
  req: any
}

export default async function ItemList({ req }: propsType) {
  // ------------------------------------------
  // fetch data
  // ------------------------------------------
  const { data, error } = await getAllResource()
  var sortedData = data?.sort(
    (a: any, b: any) =>
      new Date(b.attributes.publishedAt).getTime() -
      new Date(a.attributes.publishedAt).getTime()
  )
  console.log(sortedData)
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
        {sortedData?.map((item: any) => {
          return (
            <ItemCard
              data-key={`${item.attributes.type}-${item.id}`}
              key={`${item.attributes.type}-${item.id}`}
              item={item}
            />
          )
        })}
      </div>
    </div>
  )
}
