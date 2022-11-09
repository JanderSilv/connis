import { KeyboardEvent, useRef, useState } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import {
  Autocomplete,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { Wizard } from 'react-use-wizard'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import {
  proposalCategoryOptions,
  proposalTypeOptions,
  trlOptions,
  measurementUnitsOptions,
  periodicityOptions,
} from 'src/data/proposal'
import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { proposalRegisterSchema } from 'src/validations/proposal-register'

import { AnimatedStep, WizardFooter } from 'src/components/proposal-register'
import { CardsSelect } from 'src/components/proposal-register/cards-select'
import { Container } from 'src/components/container'
import { ProductionContainer, Wrapper } from 'src/styles/proposal-register'

const checkProposalCategoryHasQuestions = (proposalCategory: ProposalCategory) => {
  if (proposalCategory === ProposalCategory.waste) return true
}

const ProposalRegister: NextPage = () => {
  const formMethods = useForm<Proposal>({
    resolver: yupResolver(proposalRegisterSchema),
    defaultValues: {
      keywords: [],
      categoryQuestions: {
        waste: {
          production: {
            unit: '',
            periodicity: '',
          },
        },
      },
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

  const [keywordsInputValue, setKeywordsInputValue] = useState('')

  const previousStep = useRef(0)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') nextButtonRef.current?.click()
  }

  const onSubmit = (data: Proposal) => {
    axios.post('https://api.jsonbin.io/v3/b', data, {
      headers: {
        'X-Master-Key': '$2b$10$AZS8O9vbnQ22oOD6kb3cDucYvYwySweKMgOCr5voMV51D/zKISEt6',
        'X-Bin-Name': data.title,
      },
    })
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

              <FormLabel htmlFor="proposal-type" sx={{ mt: 3 }}>
                Qual será o tipo da proposta?
              </FormLabel>
              <Controller
                name="proposalType"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    id="proposal-type"
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
                variant="standard"
                placeholder="Descreva o problema"
                {...register('proposalDescription')}
                helperText={errors.proposalDescription?.message}
                error={!!errors.proposalDescription}
                multiline
                fullWidth
              />

              <FormLabel htmlFor="keywords" sx={{ mt: 4 }}>
                Palavras chaves nos ajudarão a identificar soluções ou conexões para sua proposta.
              </FormLabel>
              <Typography component="span" variant="caption" mt={0.3}>
                Exemplo: Têxtil; Papel; Reciclagem.
              </Typography>

              <Controller
                name="keywords"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                  <Autocomplete
                    id="keywords"
                    options={[]}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Defina algumas palavras chaves"
                        helperText={
                          !errors.keywords ? 'Pressione enter para registrar uma palavra' : errors.keywords?.message
                        }
                        error={!!errors.keywords}
                        sx={{ marginTop: 1 }}
                      />
                    )}
                    {...rest}
                    value={value}
                    onChange={(_, optionsValue) => onChange(optionsValue)}
                    inputValue={keywordsInputValue}
                    onInputChange={(_, inputValue) => {
                      if (inputValue.length > 1 && [',', ';', ' '].includes(inputValue[inputValue.length - 1])) {
                        onChange([...value, inputValue.slice(0, -1)])
                        return setKeywordsInputValue('')
                      }
                      if (inputValue.match(/^[a-zA-Z0-9\u00C0-\u00FF\-]+$/i) || inputValue === '') {
                        setKeywordsInputValue(inputValue)
                      }
                    }}
                    clearText="Limpar"
                    freeSolo
                    multiple
                  />
                )}
              />
            </AnimatedStep>

            <AnimatedStep previousStep={previousStep}>
              <Typography variant="h2" mb={4} textAlign="center">
                Níveis de Maturidade (TRL)
              </Typography>

              <FormLabel htmlFor="trl" sx={{ mt: 3 }}>
                Qual o nível de maturidade da sua proposta?
              </FormLabel>
              <Controller
                name="trl"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    id="trl"
                    options={trlOptions}
                    onChange={value => onChange(value)}
                    helperText={errors.trl?.message}
                    error={!!errors.trl}
                    carouselRef={ref}
                    {...rest}
                  />
                )}
              />

              <FormLabel htmlFor="goal-trl" sx={{ mt: 3 }}>
                Qual o nível de maturidade que almeja alcançar?
              </FormLabel>
              <Controller
                name="goalTrl"
                control={control}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CardsSelect
                    id="goal-trl"
                    options={trlOptions}
                    onChange={value => onChange(value)}
                    helperText={errors.goalTrl?.message}
                    error={!!errors.goalTrl}
                    carouselRef={ref}
                    {...rest}
                  />
                )}
              />
            </AnimatedStep>

            {checkProposalCategoryHasQuestions(watchedProposalCategory) && (
              <AnimatedStep previousStep={previousStep}>
                <Typography variant="h2" mb={0.5} textAlign="center">
                  Descrições adicionais sobre a proposta {proposalCategoryOptions[watchedProposalCategory].title}
                </Typography>
                <Typography mb={2} textAlign="center">
                  Essas descrições são opcionais, mas ajudarão as empresas a entender o atual estado do resíduo.
                </Typography>
                {(() => {
                  if (watchedProposalCategory === ProposalCategory.waste) {
                    const wasteErrors = errors.categoryQuestions?.waste

                    const hasError = (() => {
                      if (!wasteErrors?.production) return false
                      const { periodicity, unit, volume } = wasteErrors.production
                      return volume?.message || unit?.message || periodicity?.message
                    })()

                    return (
                      <>
                        <Controller
                          name="categoryQuestions.waste.testHasBeenPerformed"
                          control={control}
                          render={({ field }) => (
                            <FormControl error={!!wasteErrors?.testHasBeenPerformed} sx={{ marginTop: 4 }} fullWidth>
                              <FormLabel id="test-has-been-performed-label" sx={{ color: 'text.primary' }}>
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
                          name="categoryQuestions.waste.toxicity"
                          control={control}
                          render={({ field }) => (
                            <FormControl error={!!wasteErrors?.toxicity} sx={{ marginTop: '2rem' }} fullWidth>
                              <FormLabel id="toxicity-label" sx={{ color: 'text.primary' }}>
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

                        <FormLabel htmlFor="production-volume" sx={{ mt: 4 }}>
                          Qual o volume de produção?
                        </FormLabel>
                        <ProductionContainer>
                          <TextField
                            id="production-volume"
                            label="Valor"
                            variant="standard"
                            {...register('categoryQuestions.waste.production.volume')}
                            error={!!wasteErrors?.production?.volume}
                            size="small"
                            sx={{ maxWidth: 130 }}
                            fullWidth
                          />
                          <TextField
                            {...register('categoryQuestions.waste.production.unit')}
                            variant="standard"
                            label="Unidade"
                            error={!!wasteErrors?.production?.unit}
                            size="small"
                            select
                          >
                            {measurementUnitsOptions.map(({ label, units }) => [
                              <ListSubheader key={label}>{label}</ListSubheader>,
                              ...units.map(unit => (
                                <MenuItem key={unit} value={unit}>
                                  {unit}
                                </MenuItem>
                              )),
                            ])}
                          </TextField>
                          <TextField
                            {...register('categoryQuestions.waste.production.periodicity')}
                            variant="standard"
                            label="Periodicidade"
                            error={!!wasteErrors?.production?.periodicity}
                            size="small"
                            select
                          >
                            {periodicityOptions.map(periodicity => (
                              <MenuItem key={periodicity} value={periodicity}>
                                {periodicity}
                              </MenuItem>
                            ))}
                          </TextField>
                        </ProductionContainer>
                        {hasError && <FormHelperText error={true}>{hasError}</FormHelperText>}
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
