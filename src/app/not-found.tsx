import { Row } from "@/components/CustomTags"
import React from "react"
import styles from "./notfound.module.scss"
const Custom404 = () => {
  return (
    <section>
      <Row className={styles.notfound}>
        <img
          src="/lio-logo.svg"
          alt="LIO los inorgánicos organizados"
          height={130}
        />
        <div>
          <h1>404</h1>
          <p>Parece que la página que buscas no existe.</p>
        </div>
        <a href="/">ir al inicio</a>
      </Row>
    </section>
  )
}

export default Custom404
