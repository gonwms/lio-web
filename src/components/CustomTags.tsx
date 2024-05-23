import { Flex, FlexProps } from "@radix-ui/themes"
import React, { Children } from "react"

// Define props interface for Col component (optional)
type IsProps = React.ComponentProps<typeof Flex>

// Define Col component
const Col: React.FC<IsProps> = ({ children, ...props }) => {
  return <Flex {...props}>{children}</Flex>
}
// Define Col component
const Row: React.FC<IsProps> = ({ children, ...props }) => {
  return <Flex {...props}>{children}</Flex>
}

const Section: React.FC<IsProps> = ({ children, ...props }) => {
  return (
    <Flex {...props} asChild>
      <section>{children}</section>
    </Flex>
  )
}

export { Col, Row, Section }
