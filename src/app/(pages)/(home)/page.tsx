"use client"
import React, { useRef } from "react"
import classNames from "classnames"

import styles from "./home.module.scss"
import { useAnimation } from "./useAnimation"
import { Button, Grid, Skeleton } from "@radix-ui/themes"
import { Http2ServerResponse } from "http2"
import AdmisionForm from "@/components/forms/AdminisionForm"

// import Button from '@/components/button/Button'
// import { Arrow } from '@/components/icon/Icon'
// import { Row, Col, Content, Section } from '@/components/stack/Stack'
// import AdmisionForm from '@/components/forms/AdminisionForm'

//
export default function Home() {
  // --- ANIMATION
  // const scope = useRef<HTMLDivElement>(null)
  // useAnimation(scope)

  return (
    <Grid columns={{ xs: "1", sm: "2", lg: "4" }}>
      <h1>HOME</h1>
      <h2>contact</h2>
      <Button className={styles.boton}>Salsa</Button>
      <AdmisionForm />
    </Grid>
    //   <div className={styles.main} ref={scope}>
    //     {/*
    //      *
    //      *
    //      * ----------------------------- 1 HERO ---------------------
    //      *
    //      *
    //      */}
    //     <Section className={classNames(styles.section, styles.section1, 'anim-section1')}>
    //       <Row className={classNames(styles.row)}>
    //         <Col className={classNames(styles.col, styles.col1)}>
    //           <h1>
    //             Tu <span className="stress green">salud mental </span>es
    //             <br /> nuestra prioridad.
    //           </h1>
    //           <p>
    //             Somos un equipo de psicólogos, especializados en distintas áreas, dispuestos a ofrecer tratamientos de la más alta calidad
    //             para ayudar a las personas a alcanzar su bienestar emocional.
    //           </p>
    //           <Button href="#">
    //             Solicitar entrevista gratuita
    //             <Button.Icon>
    //               <Arrow width={30} />
    //             </Button.Icon>
    //           </Button>
    //         </Col>
    //         <Col className={classNames(styles.col, styles.col2)}>
    //           <img className={classNames(styles.patos)} src="/img/patos.svg" alt="psicologos argentinos" width="952" height="951" />
    //           <img className={classNames(styles.cabeza)} src="/img/cabeza.png" alt="psicologos argentinos" width="346" height="707" />
    //           <img className={classNames(styles.manos)} src="img/manos.png" alt="psicologos argentinos" width="711" height="704" />
    //         </Col>
    //       </Row>
    //     </Section>
    //     {/*
    //      *
    //      *
    //      * ----------------------------- 2 SECTION 2 ---------------------
    //      *
    //      *
    //      */}
    //     <Section className={classNames(styles.section, styles.section2, 'anim-section2')}>
    //       <Row className={classNames(styles.row)}>
    //         <Col className={classNames(styles.col, styles.col1)}>
    //           <h2>
    //             Ahora <span className="stress yellow">tienes acceso</span> a un profesional especializado.
    //           </h2>
    //           <p>Acceso inmediato a profesionales especializados desde la de tu Hogar.</p>
    //           <Button href="#">
    //             Solicitar entrevista gratuita
    //             <Button.Icon>
    //               <Arrow width={30} />
    //             </Button.Icon>
    //           </Button>
    //         </Col>
    //         <Col className={classNames(styles.col, styles.col2)}>
    //           <img className={classNames(styles.girl)} src="/img/girl.png" alt="psicologos argentinos" width="505" height="201" />
    //           <img className={classNames(styles.cactus)} src="/img/cactus.png" alt="psicologos argentinos" width="201" height="201" />
    //           <img className={classNames(styles.keys)} src="/img/keys.png" alt="psicologos argentinos" width="201" height="201" />
    //           <img className={classNames(styles.guy)} src="/img/guy.png" alt="psicologos argentinos" width="505" height="201" />
    //         </Col>
    //       </Row>
    //     </Section>
    //     {/*
    //      *
    //      *
    //      * ----------------------------- 3 PROCCESS ---------------------
    //      *
    //      *
    //      */}
    //     <Section className={classNames(styles.section, styles.section3)}>
    //       <Row className={classNames(styles.row)}>
    //         <Col className={classNames(styles.col, styles.col1)}>
    //           <h2>Simplificamos el proceso</h2>
    //           <p>En nuestro enfoque, fusionamos la psicología con la tecnología. Estamos comprometidos en ser tu apoyo constante.</p>

    //           <Button href="#">
    //             Comienza ahora
    //             <Button.Icon>
    //               <Arrow width={30} />
    //             </Button.Icon>
    //           </Button>
    //         </Col>
    //       </Row>
    //       {/*
    //        *
    //        *
    //        * ----------------------------- 4 NOSOTROS ---------------------
    //        *
    //        *
    //        */}
    //       <Section className={classNames(styles.section, styles.section4, 'anim-section4')}>
    //         <Row className={classNames(styles.row)}>
    //           <Col className={classNames(styles.col, styles.col1)}>
    //             <h2>Nosotros</h2>
    //             <h3>
    //               Los profesionales formados en las universidades argentinas, están dejado una huella en el panorama internacional de la
    //               psicología.
    //             </h3>
    //             <p>
    //               La calidad de la educación universitaria Argentina ha preparado a graduados con habilidades sólidas, un entendimiento
    //               profundo de las complejidades del comportamiento humano y una perspectiva culturalmente enriquecedora. ganándose el respeto
    //               y la admiración de sus colegas y pacientes a nivel global.
    //             </p>
    //             <Button href="#">
    //               Solicitar entrevista gratuita
    //               <Button.Icon>
    //                 <Arrow width={30} />
    //               </Button.Icon>
    //             </Button>
    //           </Col>
    //           <Col className={classNames(styles.col, styles.col2)}>
    //             <img className={classNames(styles.cabeza)} src="/img/ovillo.png" alt="psicologos argentinos" width="133" height="131" />
    //             <img className={classNames(styles.cabeza)} src="/img/diego.png" alt="psicologos argentinos" width="211" height="441" />
    //             <img className={classNames(styles.cabeza)} src="/img/guille.png" alt="psicologos argentinos" width="211" height="440" />
    //             <img className={classNames(styles.cabeza)} src="/img/manos-azul.png" alt="psicologos argentinos" width="140" height="84" />
    //           </Col>
    //         </Row>
    //       </Section>
    //       {/*
    //        *
    //        *
    //        * ----------------------------- 5 OPINIONES ---------------------
    //        *
    //        *
    //        */}
    //       <Section className={classNames(styles.section, styles.section5)}>
    //         <Row className={classNames(styles.row)}>
    //           <Col className={classNames(styles.col, styles.col1)}>
    //             <h2>Opiniones</h2>
    //             <p>opinion 1</p>
    //             <p>opinion 1</p>
    //             <p>opinion 1</p>
    //             <p>opinion 1</p>
    //           </Col>
    //         </Row>
    //       </Section>
    //       {/*
    //        *
    //        *
    //        * ----------------------------- 6 CONTACT ---------------------
    //        *
    //        *
    //        */}
    //     </Section>
    //     <Section className={classNames(styles.section, styles.contact)}>
    //       <Row className={classNames(styles.row, styles.row1)}>
    //         <Col className={classNames(styles.col, styles.col1)}>
    //           <AdmisionForm />
    //         </Col>
    //       </Row>
    //     </Section>

    //     {/*  */}
    //     {/*
    //      *
    //      *
    //      * ----------------------------- 7 FAQ ---------------------
    //      *
    //      *
    //      */}
    //     <Section className={classNames(styles.section, styles.section7)}>
    //       <Row className={classNames(styles.row)}>
    //         <Col className={classNames(styles.col, styles.col1)}>
    //           <h2>Preguntas frecuentes</h2>
    //           <details>
    //             <summary>¿Es la terapia en linea efectiva?</summary>
    //             si
    //           </details>
    //           <details>
    //             <summary>Soy enejer o histeriquilla?</summary>
    //             enejer
    //           </details>
    //         </Col>
    //       </Row>
    //     </Section>
    //   </div>
  )
}
