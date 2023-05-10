import { HttpResponseError } from 'src/models/types'
import { toast } from './toast'

export const toastHttpError = (
  error: unknown,
  fallbackMessage = 'Não foi possível realizar está ação, por favor, tente novamente mais tarde'
) => {
  const { response } = error as HttpResponseError
  const message = response?.data?.message || fallbackMessage
  toast.show(message, 'error')
}
