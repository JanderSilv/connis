import { render, screen } from '@testing-library/react'
import { SnackbarProvider, VariantType } from 'notistack'
import { toast } from 'src/helpers/toast'

type ToastProps = {
  variant: VariantType
}

const TriggerToast = ({ variant }: ToastProps) => {
  toast.show('Test', variant)
  return <></>
}

describe('Toast', () => {
  it('should appear a toast', () => {
    render(
      <SnackbarProvider>
        <TriggerToast variant="success" />
      </SnackbarProvider>
    )
    const successToast = screen.getByRole('alert')
    expect(successToast).toBeInTheDocument()
  })
})
