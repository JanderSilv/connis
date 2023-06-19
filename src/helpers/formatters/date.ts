import { formatDistanceToNow } from 'date-fns'
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'

const TIME_ZONE = 'America/Sao_Paulo'

const distanceToNow = (date: Date) => formatDistanceToNow(utcToZonedTime(date, TIME_ZONE), { locale: ptBR })

const longDate = (date: Date) => {
  const formattedDateArray = formatInTimeZone(date, TIME_ZONE, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  }).split(' ')
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
