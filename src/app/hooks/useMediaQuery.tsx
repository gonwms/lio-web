import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IsProps {
  query: string
}
const useMediaQuery = (query: string) => {
  //
  const [matches, setMatches] = useState<null | boolean>(null)

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)
    setMatches(matchQueryList.matches)

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }
    matchQueryList.addEventListener("change", handleChange)

    return () => {
      matchQueryList.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

export default useMediaQuery
