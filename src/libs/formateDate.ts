export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear().toString() // .slice(-2)
  const hour = date.getHours()
  return `${day} ${month} ${year}`
}

export const formatEventDay = (dateString: string) => {
  console.log(dateString)
  if (dateString === null)
    return {
      day: "",
      hour: "",
    }
  const date = new Date(dateString)
  const dayName = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(
    date
  )
  const day = date.getDate()
  const monthName = new Intl.DateTimeFormat("es-AR", { month: "long" }).format(
    date
  )
  const year = date.getFullYear()
  const hour = date.getHours().toString().padStart(2, "0")
  const minute = date.getMinutes().toString().padStart(2, "0")

  return {
    day: `${dayName} ${day} ${monthName}`,
    hour: `${hour}:${minute}`,
  }
}
