import { Flex, FlexProps } from "@radix-ui/themes"
import React, { Children } from "react"

// type IsProps = React.ComponentProps<typeof Flex>
type IsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

// const Col: React.FC<IsProps> = ({ children, ...props }) => {
//   return <div {...props}>{children}</div>
// }

// const Row: React.FC<IsProps> = ({ children, ...props }) => {
//   return <div {...props}>{children}</div>
// }
const Col: React.FC<IsProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const Row: React.FC<IsProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

// const Section: React.FC<IsProps> = ({ children, ...props }) => {
//   return (
//     <div {...props} >
//       <section>{children}</section>
//     </div>
//   )
// }

export { Col, Row }
