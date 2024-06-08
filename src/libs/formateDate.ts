export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear().toString() // .slice(-2)
  const hour = date.getHours()
  return `${day} ${month} ${year}`.toUpperCase()
}
