import React, { useEffect, useState } from "react"

interface props extends React.HTMLAttributes<HTMLSelectElement> {
  handleFilters: any
  filters: any
  type: string
}
const URL = process.env.NEXT_PUBLIC_API_URL

//FETCH

export default function Filters({
  handleFilters,
  filters,
  type,
  ...rest
}: props) {
  const [dataState, setData] = useState<any>([])
  const [loading, setLoading] = useState<any>(true)
  const [error, setError] = useState<any>(null)

  // const data = await getCategories(type)
  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${URL}/api/${type}`, {
        method: "GET",
      })
      const data = await res.json()
      // console.log(data)
      setData(data.data)
      error && setError(error)
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <select onChange={handleFilters} value={filters} {...rest}>
        <option value="">todos</option>

        {/* TODO make al components documentation */}
        {dataState?.map((option: any) => {
          return (
            <option key={option.id} value={option.attributes.name}>
              {option.attributes.name}
            </option>
          )
        })}
      </select>
    </>
  )
}
