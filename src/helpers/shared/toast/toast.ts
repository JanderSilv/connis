import { closeSnackbar, enqueueSnackbar, VariantType } from 'notistack'

export const toast = {
  show: (message: string, variant: VariantType) => enqueueSnackbar(message, { variant }),
  close: (key?: string) => closeSnackbar(key),
}
