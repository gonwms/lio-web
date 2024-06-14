import "server-only"

import classNames from "classnames"
import styles from "./Item.module.scss"
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
    return <span>{error.message}</span>
  }
  if (data?.length === 0) {
    return <h3>no hay resultados</h3>
  }
  return (
    <div>
      <div className={classNames(styles.filters)}>
        <span>Ordenar por</span>
        <span>Categorias</span>
        <input type="text" name="" id="" placeholder="Buscar" />
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
