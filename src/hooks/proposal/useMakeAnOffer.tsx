import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Typography,
  FormLabel,
  Collapse,
  DialogContentText,
} from '@mui/material'
import { ResponsiveType } from 'react-multi-carousel'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { proposalTypeOptions } from 'src/data/proposal'
import { useToast } from 'src/hooks/useToast'
import { formatCurrency } from 'src/helpers/formatters'
import { makeAnOfferSchema, makeAnOfferValidationSchema } from 'src/validations/proposal'

import { ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { DescriptionIcon } from 'src/assets/icons'
import { CardData, CardsSelect, SlideTransition } from 'src/components/shared'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  proposal: Proposal
}

const responsiveCarousel: ResponsiveType = {
  desktop: {
    breakpoint: { max: 4000, min: 780 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 780, min: 450 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 0,
  },
  phone: {
    breakpoint: { max: 450, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 0,
  },
}

const MakeAnOfferDialog = (props: Props) => {
  const { isOpen, setIsOpen, proposal } = props
  const { showToast } = useToast()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<makeAnOfferSchema>({
    resolver: zodResolver(makeAnOfferValidationSchema),
    defaultValues: {
      proposalType: proposal.proposalType.length === 1 ? proposal.proposalType[0] : undefined,
    },
  })

  const watchedProposalType = watch('proposalType')

  const disabledProposalTypeOptions = proposalTypeOptions.reduce((acc, option) => {
    if (option.id === ProposalType.research) return acc
    if (!proposal.proposalType.includes(option.id)) acc.push({ ...option, disabled: true })
    else acc.push(option)
    return acc
  }, [] as CardData[])

  const sendOffer = async (data: makeAnOfferSchema) => {
    console.log({ data })
    showToast('Oferta enviada com sucesso', 'success')
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={SlideTransition}
      onClose={() => setIsOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <Box component="form" onSubmit={handleSubmit(sendOffer)}>
        <Box mt={2} textAlign="center">
          <DescriptionIcon fontSize="large" />
        </Box>
        <DialogTitle textAlign="center" sx={{ pt: 0, pb: 1 }}>
          Fazer uma oferta
        </DialogTitle>
        <DialogContentText textAlign="center">
          Descreva como você pode auxiliar ou solucionar essa proposta.
        </DialogContentText>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Mensagem"
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{ mt: 1, mb: 3 }}
            multiline
            fullWidth
          />
          <FormLabel htmlFor="proposal-type">Selecione o tipo da proposta</FormLabel>
          <Controller
            name="proposalType"
            control={control}
            render={({ field: { onChange, ref, ...rest } }) => (
              <CardsSelect
                id="proposal-type"
                options={disabledProposalTypeOptions}
                onChange={value => onChange(value)}
                helperText={errors.proposalType?.message}
                error={!!errors.proposalType}
                carouselRef={ref}
                carousel={{
                  responsive: responsiveCarousel,
                  partialVisible: true,
                }}
                disabled={proposal.proposalType.length === 1}
                {...rest}
              />
            )}
          />

          <Collapse in={watchedProposalType === ProposalType.buyOrSell}>
            <Typography sx={{ mt: 2 }}>
              <ul>
                <li>
                  <Typography>
                    Você concorda com o orçamento de {formatCurrency(proposal.budget)}. Caso não, realize uma contra
                    proposta.
                  </Typography>
                </li>
              </ul>
            </Typography>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            Enviar Oferta
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export const useMakeOffer = (proposal: Proposal) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return {
    MakeAnOfferDialog: useCallback(
      () => <MakeAnOfferDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} proposal={proposal} />,
      [isDialogOpen, proposal]
    ),
    isDialogOpen,
    setIsDialogOpen,
  }
}
