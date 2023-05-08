type DebounceArgs = (...args: any[]) => any
type DebounceReturn<T extends DebounceArgs> = (...args: Parameters<T>) => Promise<ReturnType<T>>

export const debounce = <T extends DebounceArgs>(callback: T, ms: number = 1000): DebounceReturn<T> => {
  let timer: NodeJS.Timeout | undefined

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    return new Promise<ReturnType<T>>(resolve => {
      timer = setTimeout(() => {
        const returnValue = callback(...args) as ReturnType<T>
        resolve(returnValue)
      }, ms)
    })
  }
}
