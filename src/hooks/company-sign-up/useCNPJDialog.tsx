import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material'
import { useForm, UseFormReset } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from 'src/models/types'

import { useToast } from 'src/hooks/useToast'
import { CompanySignUpSchema, CnpjSchema, cnpjValidationSchema } from 'src/validations/company-sign-up'
import { brasilAPIService } from 'src/services/brasil-api'

import { MaskedTextField, SlideTransition } from 'src/components/shared'
import { BusinessIcon } from 'src/assets/icons'
import { Form } from 'src/styles/company-sign-up'

type NullishCompany = CompanySignUpSchema | null
type CompanyUseFormReset = UseFormReset<CompanySignUpSchema>

type Props = {
  fetchedCompany: NullishCompany
  setFetchedCompany: Dispatch<SetStateAction<NullishCompany>>
  reset: CompanyUseFormReset
}

const CNPJDialog = ({ fetchedCompany, setFetchedCompany, reset }: Props) => {
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
      reset(company)
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
            inputProps={{
              'data-testid': 'cnpj',
            }}
            {...register('cnpj')}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => signOut()} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" data-testid="send-cnpj" disabled={isSubmitting}>
            Enviar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const useCNPJDialog = (reset: CompanyUseFormReset) => {
  const [fetchedCompany, setFetchedCompany] = useState<NullishCompany>(null)

  return {
    CNPJDialog: useCallback(
      () => <CNPJDialog fetchedCompany={fetchedCompany} setFetchedCompany={setFetchedCompany} reset={reset} />,
      [fetchedCompany, reset]
    ),
    fetchedCompany,
    setFetchedCompany,
  }
}
