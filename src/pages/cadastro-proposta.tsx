import { KeyboardEvent, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import {
  Autocomplete,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { Wizard } from 'react-use-wizard'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal-register/options'
import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { proposalRegisterSchema } from 'src/validations/proposal-register'

import { AnimatedStep, WizardFooter } from 'src/components/proposal-register'
import { CardsSelect } from 'src/components/proposal-register/cards-select'
import { Container } from 'src/components/container'
import { Wrapper } from 'src/styles/proposal-register'

const checkProposalCategoryHasQuestions = (proposalCategory: ProposalCategory) => {
  if (proposalCategory === ProposalCategory.waste) return true
}

const ProposalRegister: NextPage = () => {
  const formMethods = useForm<Proposal>({
    resolver: yupResolver(proposalRegisterSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      keywords: [],
    },
  })
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = formMethods

  const watchedProposalCategory = watch('proposalCategory')

  const previousStep = useRef(0)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') nextButtonRef.current?.click()
  }

  const onSubmit = (data: Proposal) => {
    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      <Head>
        <title>Cadastro de Proposta</title>
      </Head>
      <Wrapper>
        <Container component="form" onSubmit={handleSubmit(onSubmit)}>
          <Wizard
            wrapper={<AnimatePresence initial={false} mode="wait" />}
            footer={<WizardFooter nextButtonRef={nextButtonRef} />}
          >
            <AnimatedStep previousStep={previousStep}>
              <Typography variant="h2" mb={4} textAlign="center">
                Título da Proposta
              </Typography>
              <TextField
                variant="standard"
                placeholder="Defina o título da proposta"
                {...register('title')}
                helperText={errors.title?.message}
                error={!!errors.title}
                onKeyDown={handleEnterKey}
                fullWidth
              />
            </AnimatedStep>

            <AnimatedStep previousStep={previousStep}>
              <Typography variant="h2" mb={1} textAlign="center">
                Categoria da Proposta
              </Typography>
              <Typography mb={4} textAlign="center">
                Selecione a categoria de proposta/problema que melhor descreve o que deseja-se resolver.
              </Typography>
              <Controller
                name="proposalCategory"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    options={proposalCategoryOptions}
                    onChange={value => onChange(value)}
                    helperText={errors.proposalCategory?.message}
                    error={!!errors.proposalCategory}
                    carouselRef={ref}
                    {...rest}
                  />
                )}
              />
              <Collapse in={watchedProposalCategory === ProposalCategory.others} sx={{ marginTop: 2 }}>
                <TextField
                  label="Qual categoria sua proposta se encaixaria?"
                  {...register('proposalCategoryOther')}
                  helperText={errors.proposalCategoryOther?.message}
                  error={!!errors.proposalCategoryOther}
                  onKeyDown={handleEnterKey}
                  size="small"
                  fullWidth
                />
              </Collapse>
            </AnimatedStep>

            <AnimatedStep previousStep={previousStep}>
              <Typography variant="h2" mb={0.5} textAlign="center">
                Descrição do projeto
              </Typography>
              <Typography mb={4} textAlign="center">
                A descrição do projeto ajudará as empresas a melhor entender o contexto do problema.
              </Typography>
              <TextField
                placeholder="Descreva o projeto"
                variant="standard"
                {...register('projectDescription')}
                helperText={errors.projectDescription?.message}
                error={!!errors.projectDescription}
                multiline
                fullWidth
              />
            </AnimatedStep>

            <AnimatedStep previousStep={previousStep}>
              <Typography variant="h2" mb={4} textAlign="center">
                Descrição da proposta
              </Typography>

              <TextField
                label="Descreva de maneira detalhada o que deseja-se resolver."
                placeholder="Descreva o problema"
                {...register('proposalDescription')}
                helperText={errors.proposalDescription?.message}
                error={!!errors.proposalDescription}
                multiline
                fullWidth
              />

              <Typography component="h3" mt={3}>
                Palavras chaves nos ajudarão a identificar soluções ou conexões para sua proposta.
              </Typography>
              <Typography mt={0.3} fontSize="0.75rem">
                Exemplo: Setor têxtil; Papel; Reciclagem.
              </Typography>

              <Controller
                name="keywords"
                control={control}
                render={({ field: { onChange, ...rest } }) => (
                  <Autocomplete
                    options={[]}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Defina algumas palavras chaves"
                        helperText={
                          !errors.keywords ? 'Pressione enter para registrar uma palavra' : errors.keywords?.message
                        }
                        error={!!errors.keywords}
                        sx={{ marginTop: '0.5rem' }}
                      />
                    )}
                    {...rest}
                    onChange={(_, value) => onChange(value)}
                    freeSolo
                    multiple
                  />
                )}
              />

              <Typography component="h3" mt={3} mb={2}>
                Qual o nível de maturidade da sua proposta?
              </Typography>
              <Controller
                name="trl"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    options={trlOptions}
                    onChange={value => onChange(value)}
                    helperText={errors.trl?.message}
                    error={!!errors.trl}
                    carouselRef={ref}
                    {...rest}
                  />
                )}
              />

              <Typography component="h3" mt={3} mb={2}>
                Qual será o tipo da proposta?
              </Typography>
              <Controller
                name="proposalType"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    options={proposalTypeOptions}
                    onChange={value => onChange(value)}
                    helperText={errors.proposalType?.message}
                    error={!!errors.proposalType}
                    carouselRef={ref}
                    {...rest}
                    multiple
                  />
                )}
              />
            </AnimatedStep>

            {checkProposalCategoryHasQuestions(watchedProposalCategory) && (
              <AnimatedStep previousStep={previousStep}>
                <Typography variant="h2" mb={0.5} textAlign="center">
                  Descrições adicionais sobre a proposta {proposalCategoryOptions[watchedProposalCategory].title}
                </Typography>
                <Typography mb="1rem" textAlign="center">
                  Essas descrições são opcionais, mas ajudarão as empresas a entender o atual estado do resíduo.
                </Typography>
                {(() => {
                  if (watchedProposalCategory === ProposalCategory.waste) {
                    const wasteErrors = errors.proposalCategoryQuestions?.waste
                    return (
                      <>
                        <Controller
                          name="proposalCategoryQuestions.waste.testHasBeenPerformed"
                          control={control}
                          render={({ field }) => (
                            <FormControl
                              error={!!wasteErrors?.testHasBeenPerformed}
                              sx={{ marginTop: '2rem' }}
                              fullWidth
                            >
                              <FormLabel id="test-has-been-performed-label">
                                Já foi realizado algum tipo de ensaio nesse resíduo?
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="test-has-been-performed-label"
                                defaultValue={null}
                                {...field}
                                row
                              >
                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                              </RadioGroup>
                              <FormHelperText>
                                {wasteErrors?.testHasBeenPerformed && wasteErrors.testHasBeenPerformed?.message}
                              </FormHelperText>
                            </FormControl>
                          )}
                        />

                        <Controller
                          name="proposalCategoryQuestions.waste.toxicity"
                          control={control}
                          render={({ field }) => (
                            <FormControl error={!!wasteErrors?.toxicity} sx={{ marginTop: '2rem' }} fullWidth>
                              <FormLabel id="toxicity-label">
                                Já foi realizado algum estudo de toxicidade ou nocividade nesse resíduo?
                              </FormLabel>
                              <RadioGroup aria-labelledby="toxicity-label" defaultValue={null} {...field} row>
                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                              </RadioGroup>
                              <FormHelperText>{wasteErrors?.toxicity && wasteErrors?.toxicity?.message}</FormHelperText>
                            </FormControl>
                          )}
                        />

                        <TextField
                          label="Qual o volume de produção?"
                          variant="standard"
                          {...register('proposalCategoryQuestions.waste.productionVolume')}
                          helperText={wasteErrors?.productionVolume?.message}
                          error={!!wasteErrors?.productionVolume}
                          sx={{ marginTop: '1rem' }}
                          fullWidth
                        />
                      </>
                    )
                  }
                })()}
              </AnimatedStep>
            )}
          </Wizard>
        </Container>
      </Wrapper>
    </FormProvider>
  )
}

export default ProposalRegister
