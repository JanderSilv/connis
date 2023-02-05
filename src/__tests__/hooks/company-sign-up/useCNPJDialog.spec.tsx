import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import { useForm, UseFormReset } from 'react-hook-form'

// import { fakeData } from 'src/data/fake'
import { useCNPJDialog } from 'src/hooks/company-sign-up'
import { CompanySignUpSchema, CompanySocialSignUpSchema } from 'src/validations/company-sign-up'

type CompanyUseFormReset = UseFormReset<CompanySignUpSchema> | UseFormReset<CompanySocialSignUpSchema>

describe('useCNPJDialog', () => {
  const { result: formResult } = renderHook(() => useForm<CompanyUseFormReset>())
  const { result: CNPJDialogResult } = renderHook(() => useCNPJDialog(formResult.current.reset as any))
  const { CNPJDialog } = CNPJDialogResult.current

  it('should render CNPJ dialog', () => {
    render(<CNPJDialog />)
    const title = screen.getByRole('heading', { name: /Qual o CNPJ da sua empresa?/i })
    expect(title).toBeInTheDocument()
  })
  it('should show error message when cnpj is invalid', async () => {
    render(<CNPJDialog />)

    const cnpjField = screen.getByTestId('cnpj')
    const sendCNPJButton = screen.getByTestId('send-cnpj')

    act(() => {
      fireEvent.change(cnpjField, { target: { value: '123' } })
      fireEvent.click(sendCNPJButton)
    })

    const errorMessage = await screen.findByText(/CNPJ inválido/i)
    expect(errorMessage).toBeInTheDocument()
  })
  // it('should fetch company', async () => {
  //   const { company } = fakeData
  //   render(<CNPJDialog />)

  //   const cnpjField = screen.getByTestId('cnpj')
  //   const sendCNPJButton = screen.getByTestId('send-cnpj')
  //   act(() => {
  //     formResult.current.setValue('cnpj', 40789236000173)
  //     fireEvent.change(cnpjField, { target: { value: 40789236000173 } })
  //     rerender()
  //     fireEvent.click(sendCNPJButton)
  //   })

  //   await waitForNextUpdate()

  //   expect(CNPJDialogResult.current.fetchedCompany).toBe(company)
  // })
})
