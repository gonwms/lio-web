"use client"

import { Button } from "@radix-ui/themes"
import React, { Suspense, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import InfiniteScroll from "./InfiniteScroll"

interface ItemListProviderProps {
  children: React.ReactNode
}

export default function ItemListProvider({ children }: ItemListProviderProps) {
  // ------------------------------------------
  // Consts
  // ------------------------------------------
  const searchParams = useSearchParams()
  const path = usePathname()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // ------------------------------------------
  // State
  // ------------------------------------------
  const [disabledBtn, setDisabledBtn] = useState([false, false])

  // ------------------------------------------
  //Event handler
  // ------------------------------------------

  function handleClick(oparation: "plus" | "minus") {
    // add or change page number

    const spObj = Object.fromEntries(searchParams.entries())
    Number(spObj.page) < 1 ? params.delete("page") : null
    Number(spObj.page) < 1
      ? setDisabledBtn([true, false])
      : setDisabledBtn([false, false])
    if (oparation === "plus") {
      spObj.page = spObj.page ? (+spObj.page + 1).toString() : "2"
    } else {
      spObj.page = spObj.page ? (+spObj.page + -1).toString() : "0"
    }
    const spString = new URLSearchParams(spObj).toString()
    const route = `?${spString}`
    router.push(route, { scroll: false })
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------
  return (
    <div>
      {/* <div>
        <Link href={{ pathname: "/", query: { page: 1 } }} scroll={false}>
          page 1
        </Link>
      </div>
      <Button disabled={disabledBtn[0]} onClick={() => handleClick("minus")}>
        Anterior
      </Button>
      <Button disabled={disabledBtn[1]} onClick={() => handleClick("plus")}>
        Siguiente
      </Button> */}
      <Suspense fallback={<h2>esperando docs...</h2>}>
        <div>{children}</div>
      </Suspense>
    </div>
  )
}
