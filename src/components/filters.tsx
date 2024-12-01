import React, { useEffect, useState } from 'react'

interface props extends React.HTMLAttributes<HTMLLabelElement> {
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
      try {
        const res = await fetch(`${URL}/api/${type}`, {
          method: 'GET'
        })
        const data = await res.json()
        // console.log(data)
        setData(data.data)
        error && setError(error)
        setLoading(false)
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [])

  return (
    <>
      {dataState?.length > 1 && (
        <label htmlFor="cat" {...rest}>
          <span>Categoria</span>
          <select id="cat" onChange={handleFilters} value={filters}>
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

          {/* <Popover.Root open={suggestions.length > 0}>
        <Popover.Trigger>
      
          <input
            name="search"
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => handleAutocomplete(e)}
          />
        </Popover.Trigger>
        <Popover.Content sideOffset={15} autoFocus={false}>
          <ul>
            {suggestions.map((label, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSearchQuery(label)
                    setSuggestions([])
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSearchQuery(label)
                      setSuggestions([])
                    }
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Root> */}
        </label>
      )}
    </>
  )
}
