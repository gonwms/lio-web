import dayjs from "dayjs"
import "dayjs/locale/es"

// dayjs.extend(AdvancedFormat)
// dayjs.extend(customParseFormat)

dayjs.locale("es")
var now = dayjs()

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format("DD [de] MMM")
}

export const formatEventDay = (dateString: string) => {
  if (dateString === null)
    return {
      day: "",
      hour: "",
    }
  const day = dayjs(dateString).format("dddd DD MMMM")
  const hour = dayjs(dateString).format("HH:mm")

  return {
    day: day,
    hour: hour,
  }
}
