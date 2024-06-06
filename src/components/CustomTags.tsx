import React from "react"

type IsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const Col: React.FC<IsProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const Row: React.FC<IsProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

export { Col, Row }
