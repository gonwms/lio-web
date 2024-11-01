import React from "react"
import { login } from "@/actions"
import styles from "./login.module.scss"
import Link from "next/link"
import { cookies } from "next/headers"
import { decrypt } from "@/libs/encrypt"

export default function Login({ searchParams }: any) {
  const encryptedSessionData = cookies().get("session")?.value as string
  const data = JSON.parse(decrypt(encryptedSessionData))
  return (
    <div>
      <h2>login</h2>
      <form action={login} className={styles.form}>
        <input
          name="user"
          type="text"
          placeholder="user"
          value="gonzalitowilliams@gmail.com"
        />
        <input
          name="pass"
          type="text"
          placeholder="pass"
          value="123456123456"
        />
        <button type="submit">login</button>
      </form>
      {data && data.user.username}
      {/* {searchParams?.clearedPathName && (
        <p>
          se actualizó:{" "}
          <Link
            rel="stylesheet"
            href={searchParams?.clearedPathName}
            target="_blank"
          >
            {searchParams?.clearedPathName}
          </Link>
        </p>
      )} */}
    </div>
  )
}
