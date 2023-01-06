import { formatDistanceToNow } from 'date-fns'

const distanceToNow = (date: Date) => formatDistanceToNow(date, { addSuffix: true })

export const formatDate = {
  distanceToNow,
}
