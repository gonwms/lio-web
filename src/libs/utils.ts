type ThrottleFunction<T extends (...args: any[]) => any> = (
  func: T,
  delay: number
) => (...args: Parameters<T>) => void
type DebounceFunction<T extends (...args: any[]) => any> = (
  func: T,
  delay: number
) => (...args: Parameters<T>) => void

export const throttle: ThrottleFunction<any> = (func, delay) => {
  let lastTime = 0

  return (...args) => {
    const now = new Date().getTime()

    if (now - lastTime >= delay) {
      func(...args)
      lastTime = now
    }
  }
}

export const debounce: DebounceFunction<any> = (func, delay) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const pause = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))
