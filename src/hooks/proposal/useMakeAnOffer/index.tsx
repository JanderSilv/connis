import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
  InputAdornment,
} from '@mui/material'
import { ResponsiveType } from 'react-multi-carousel'
import { Controller, FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { pages } from 'src/constants'
import { useLoadingBackdrop } from 'src/contexts'
import { proposalTypeOptions, trlOptions } from 'src/data/proposal'
import { useToast } from 'src/hooks/useToast'
import { getLastValue } from './helpers'
import { formatCurrency, unformatCurrency } from 'src/helpers/formatters'
import { proposalService } from 'src/services'
import { counterProposalOfferSchema, OfferSchema, makeOfferValidationSchema } from './validations'

import { OfferCategory, ProposalType } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

import { AttachMoneyIcon, DescriptionIcon } from 'src/assets/icons'
import { CardData, CardsSelect, MaskedTextField, SlideTransition } from 'src/components/shared'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  proposal: Proposal
  offers?: Offer[]
  offerCategory: OfferCategory
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
  const { isOpen, setIsOpen, proposal, offerCategory, offers } = props

  const { push } = useRouter()
  const { data: session } = useSession()
  const { showToast } = useToast()
  const { toggleLoading } = useLoadingBackdrop()

  const { user } = session!
  const lastOffer = offers?.[0]
  const budget = !offers ? proposal.budget : getLastValue('budget', offers, proposal)
  const formattedBudget = formatCurrency(budget, {
    maximumFractionDigits: 0,
  }).replace('R$', '')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<OfferSchema>({
    resolver: zodResolver(makeOfferValidationSchema(proposal.types)),
    defaultValues:
      offerCategory === OfferCategory.default
        ? {
            proposalType: proposal.types.length === 1 ? proposal.types[0] : undefined,
            category: OfferCategory.default,
          }
        : {
            category: OfferCategory.counterProposal,
            proposalType: proposal.types.length === 1 ? proposal.types[0] : undefined,
            trl: !offers ? proposal.trl : getLastValue('trl', offers, proposal),
            goalTRL: !offers ? proposal.goalTrl : getLastValue('goalTrl', offers, proposal),
            budget: formattedBudget,
          },
  })

  const watchedProposalType = watch('proposalType')

  const disabledProposalTypeOptions = proposalTypeOptions.reduce((acc, option) => {
    if (option.id === ProposalType.research) return acc
    if (!proposal.types.includes(option.id)) acc.push({ ...option, disabled: true })
    else acc.push(option)
    return acc
  }, [] as CardData[])

  const sendOffer: SubmitHandler<OfferSchema> = async data => {
    try {
      toggleLoading()
      const { data: offerResponse } = await proposalService.makeOffer(proposal.id, {
        userProponentId: user.id,
        companyProponentId: user.companyId || '',
        description: data.message,
        proposalType: data.proposalType,
        offerId: lastOffer?.id,
        suggestions:
          data.category === OfferCategory.counterProposal
            ? {
                budget: unformatCurrency(data.budget) === proposal.budget ? undefined : unformatCurrency(data.budget),
                trl: data.trl === proposal.trl ? undefined : data.trl,
                goalTrl: data.goalTRL === proposal.goalTrl ? undefined : data.goalTRL,
              }
            : undefined,
      })
      showToast('Oferta enviada com sucesso', 'success')
      setIsOpen(false)
      push(`${pages.proposal}/${proposal.id}/${pages.negotiation}/${offerResponse.negotiationId}`)
    } catch (error) {
      console.error(error)
      showToast('Erro ao enviar oferta', 'error')
    } finally {
      toggleLoading()
    }
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
          {offerCategory === OfferCategory.default ? 'Fazer uma oferta' : 'Fazer uma contraproposta'}
        </DialogTitle>
        <DialogContentText textAlign="center">
          {offerCategory === OfferCategory.default ? (
            <>Descreva como você pode auxiliar ou solucionar essa proposta.</>
          ) : (
            <>
              Descreva e marque o que você gostaria de alterar na proposta. <br /> Caso concorde com algum, basta manter
              como está.
            </>
          )}
        </DialogContentText>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Mensagem"
            placeholder={
              offerCategory === OfferCategory.default
                ? 'Ex: "Podemos solucionar sua proposta em 3 meses e..."'
                : !lastOffer?.id
                ? 'Ex: "Me interessei pela sua proposta, mas gostaria de alterar alguns pontos..."'
                : 'Ex: "Não concordo com o valor proposto, pois...'
            }
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
                disabled={proposal.types.length === 1}
                {...rest}
              />
            )}
          />

          <Collapse
            in={watchedProposalType === ProposalType.buyOrSell && offerCategory === OfferCategory.default}
            sx={{ mt: 2 }}
          >
            <ul>
              <li>
                <Typography>
                  Você concorda com o valor de {formatCurrency(proposal.budget)}. Caso não, realize uma contra proposta.
                </Typography>
              </li>
            </ul>
          </Collapse>

          {(() => {
            if (offerCategory === OfferCategory.counterProposal) {
              const formErrors: FieldErrors<counterProposalOfferSchema> = errors
              const watchedTRL = watch('trl')
              const watchedGoalTRL = watch('goalTRL')
              const watchedBudget = watch('budget')

              return (
                <>
                  <FormLabel htmlFor="trl" sx={{ mt: 2, display: 'inline-block' }}>
                    Qual nível de maturidade você acredita que a proposta se encaixa?
                  </FormLabel>
                  <Controller
                    name="trl"
                    control={control}
                    render={({ field: { onChange, ...rest } }) => (
                      <CardsSelect
                        id="trl"
                        options={trlOptions}
                        onChange={value => onChange(value)}
                        helperText={formErrors.trl?.message}
                        error={!!formErrors.trl}
                        carousel={{
                          responsive: responsiveCarousel,
                          partialVisible: true,
                        }}
                        {...rest}
                      />
                    )}
                  />

                  <Collapse in={watchedTRL !== proposal.trl} sx={{ mt: 1 }}>
                    <ul>
                      <li>
                        <Typography color="warning.main">
                          Você alterou o nível de maturidade para <strong>TRL {watchedTRL}</strong> , o original era{' '}
                          <strong>TRL {proposal.trl}</strong>.
                        </Typography>
                      </li>
                    </ul>
                  </Collapse>

                  <FormLabel htmlFor="goal-trl" sx={{ mt: 2, display: 'inline-block' }}>
                    Qual nível de maturidade você pode auxiliar a empresa a alcançar?
                  </FormLabel>
                  <Controller
                    name="goalTRL"
                    control={control}
                    render={({ field: { onChange, ...rest } }) => (
                      <CardsSelect
                        id="goal-trl"
                        options={trlOptions}
                        onChange={value => onChange(value)}
                        helperText={formErrors.goalTRL?.message}
                        error={!!formErrors.goalTRL}
                        carousel={{
                          responsive: responsiveCarousel,
                          partialVisible: true,
                        }}
                        {...rest}
                      />
                    )}
                  />

                  <Collapse in={watchedGoalTRL !== proposal.goalTrl} sx={{ mt: 1 }}>
                    <ul>
                      <li>
                        <Typography color="warning.main">
                          Você alterou o nível de maturidade para <strong>TRL {watchedGoalTRL}</strong> , o original era{' '}
                          <strong>TRL {proposal.goalTrl}</strong>.
                        </Typography>
                      </li>
                    </ul>
                  </Collapse>

                  <Collapse
                    in={[ProposalType.buyOrSell, ProposalType.research].includes(watchedProposalType)}
                    sx={{ mt: 2 }}
                  >
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field: { onChange, ...rest } }) => (
                        <MaskedTextField
                          label={
                            watchedProposalType === ProposalType.buyOrSell
                              ? 'Quanto você está disposto a pagar ou receber pela sua proposta?'
                              : 'Quanto você está disposto a investir?'
                          }
                          placeholder="Valor"
                          inputMode="numeric"
                          mask={Number}
                          radix=","
                          mapToRadix={['.']}
                          scale={0}
                          signed={false}
                          thousandsSeparator="."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          {...rest}
                          onAccept={newValue => onChange(newValue)}
                          error={!!formErrors.budget}
                          helperText={formErrors.budget?.message}
                          size={'small' as any}
                          fullWidth
                        />
                      )}
                    />
                  </Collapse>
                  <Collapse in={!!watchedBudget && watchedBudget !== formattedBudget} sx={{ mt: 1 }}>
                    <ul>
                      <li>
                        <Typography color="warning.main">
                          Você alterou o valor para <strong>R$ {watchedBudget}</strong>, o original era{' '}
                          <strong>{formatCurrency(budget)}</strong>.
                        </Typography>
                      </li>
                    </ul>
                  </Collapse>
                </>
              )
            }
          })()}
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

export const useMakeAnOffer = (proposal: Proposal, offers?: Offer[]) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [offerCategory, setOfferCategory] = useState<OfferCategory>(OfferCategory.default)

  const handleOpenMakeAnOfferDialog = useCallback((category: OfferCategory) => {
    setOfferCategory(category)
    setIsDialogOpen(true)
  }, [])

  return {
    MakeAnOfferDialog: useCallback(
      () => (
        <MakeAnOfferDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          proposal={proposal}
          offerCategory={offerCategory}
          offers={offers}
        />
      ),
      [isDialogOpen, offerCategory, offers, proposal]
    ),
    isDialogOpen,
    handleOpenMakeAnOfferDialog,
  }
}
