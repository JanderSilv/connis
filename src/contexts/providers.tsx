import { useAuth } from 'src/hooks/auth'
import { ConfirmDialogProvider } from './confirm-dialog'
import { LoadingBackdropProvider } from './loading-backdrop'

type ProvidersProps = {
  children: React.ReactNode
}

export const AppProviders = ({ children }: ProvidersProps) => {
  useAuth()

  return (
    <LoadingBackdropProvider>
      <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
    </LoadingBackdropProvider>
  )
}
