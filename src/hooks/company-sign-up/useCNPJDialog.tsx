import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material'
import { useForm, UseFormReset } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { pages } from 'src/constants'
import { useToast } from 'src/hooks/useToast'
import { CompanyUser } from 'src/models/types'
import { CompanySignUpSchema, CnpjSchema, cnpjValidationSchema } from 'src/validations/company-sign-up'
import { brasilAPIService } from 'src/services/brasil-api'

import { MaskedTextField, SlideTransition } from 'src/components/shared'
import { BusinessIcon } from 'src/assets/icons'
import { Form } from 'src/styles/company-sign-up'

type NullishCompany = CompanyUser | null

type Props = {
  session?: Session
  fetchedCompany: NullishCompany
  setFetchedCompany: Dispatch<SetStateAction<NullishCompany>>
  reset: UseFormReset<CompanySignUpSchema>
}

const CNPJDialog = ({ session, fetchedCompany, setFetchedCompany, reset }: Props) => {
  const { replace, pathname } = useRouter()
  const { showToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CnpjSchema>({
    resolver: zodResolver(cnpjValidationSchema),
  })

  const fetchCNPJ = async (data: CnpjSchema) => {
    try {
      const company = await brasilAPIService.getCompany(data.cnpj.replace(/\D/g, ''))
      setFetchedCompany(company)
      reset({
        ...company,
        email: session?.user.email || company.email,
        image: session?.user.image || company.image,
      })
    } catch (error) {
      console.error(error)
      showToast('Não foi possível buscar a empresa, por favor, tente novamente mais tarde.', 'error')
    }
  }

  return (
    <Dialog open={!fetchedCompany} TransitionComponent={SlideTransition}>
      <Form onSubmit={handleSubmit(fetchCNPJ)} sx={{ gap: 0 }}>
        <Box mt={2} alignSelf="center">
          <BusinessIcon fontSize="large" />
        </Box>
        <DialogTitle textAlign="center" sx={{ pt: 0, pb: 1 }}>
          Qual o CNPJ da sua empresa?
        </DialogTitle>
        <DialogContent>
          <MaskedTextField
            variant="standard"
            label="CNPJ"
            mask="00.000.000/0000-00"
            {...register('cnpj')}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => (pathname === pages.companySignUp ? replace(pages.login) : signOut())}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Enviar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const useCNPJDialog = (reset: UseFormReset<CompanySignUpSchema>, session?: Session) => {
  const [fetchedCompany, setFetchedCompany] = useState<CompanyUser | null>(null)

  return {
    CNPJDialog: useCallback(
      () => (
        <CNPJDialog
          session={session}
          fetchedCompany={fetchedCompany}
          setFetchedCompany={setFetchedCompany}
          reset={reset}
        />
      ),
      [session, fetchedCompany, reset]
    ),
    fetchedCompany,
  }
}
