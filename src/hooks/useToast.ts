import { useSnackbar, VariantType } from 'notistack'

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const showToast = (message: string, variant: VariantType) => enqueueSnackbar(message, { variant })
  const closeToast = (key?: string) => closeSnackbar(key)

  return { showToast, closeToast }
}
