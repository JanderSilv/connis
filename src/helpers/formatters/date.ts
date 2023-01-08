import { format, formatDistanceToNow } from 'date-fns'

const distanceToNow = (date: Date) => formatDistanceToNow(date, { addSuffix: true })

const longDate = (date: Date) => {
  const formattedDateArray = format(date, "dd 'de' MMMM 'de' yyyy").split(' ')
  const monthIndex = formattedDateArray.findIndex(word => word === 'de')
  const capitalizedMonth =
    formattedDateArray[monthIndex + 1].charAt(0).toUpperCase() + formattedDateArray[monthIndex + 1].slice(1)
  formattedDateArray[monthIndex + 1] = capitalizedMonth
  return formattedDateArray.join(' ')
}

export const formatDate = {
  distanceToNow,
  longDate,
}
