import { useState, memo, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material'
import { useForm, UseFormReset } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from 'src/hooks/useToast'
import { Company } from 'src/models/types'
import { CompanySignUpSchema, CnpjSchema, cnpjValidationSchema } from 'src/validations/company-sign-up'
import { brasilAPIService } from 'src/services/brasil-api'

import { MaskedTextField, SlideTransition } from 'src/components/shared'
import { BusinessIcon } from 'src/assets/icons'
import { Form } from 'src/styles/company-sign-up'

export const useCNPJDialog = (reset: UseFormReset<CompanySignUpSchema>) => {
  const { replace } = useRouter()
  const { showToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CnpjSchema>({
    resolver: zodResolver(cnpjValidationSchema),
  })
  const fetchedCompany = useRef<Company | null>(null)

  const fetchCNPJ = async (data: CnpjSchema) => {
    try {
      // TODO: Discover why the Dialog is re-rendering when the company is fetched
      const company = await brasilAPIService.getCompany(data.cnpj.replace(/\D/g, ''))
      fetchedCompany.current = company
      reset(company)
    } catch (error) {
      console.error(error)
      showToast('Não foi possível buscar a empresa, por favor, tente novamente mais tarde.', 'error')
    }
  }

  const CNPJDialog = () => (
    <Dialog open={!fetchedCompany.current} TransitionComponent={SlideTransition}>
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
          <Button onClick={() => replace('/')} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Enviar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )

  return {
    CNPJDialog: memo(CNPJDialog),
    fetchedCompany: fetchedCompany.current,
  }
}
