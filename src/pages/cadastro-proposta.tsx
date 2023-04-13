import { KeyboardEvent, useRef, useState } from 'react'
import type { /* GetServerSideProps, */ NextPage } from 'next'
import {
  Autocomplete,
  Box,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { Wizard } from 'react-use-wizard'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import { ProposalCategory, ProposalType } from 'src/models/enums'
import { User } from 'src/models/types'

import { useConfirmDialog, useLoadingBackdrop } from 'src/contexts'
import {
  proposalCategoryOptions,
  proposalTypeOptions,
  trlOptions,
  measurementUnitsOptions,
  periodicityOptions,
  proposalAdditionalQuestions,
} from 'src/data/proposal'
// import { withAuth } from 'src/helpers/withAuth'
import { useProposalRegister } from 'src/hooks/proposal-register'
import { toast } from 'src/helpers'
import { proposalRegisterSchema, ProposalSchema } from 'src/validations/proposal-register'

import { Layout } from 'src/layouts/app'
import { AnimatedStep, WizardFooter } from 'src/components/proposal-register'
import { Container } from 'src/components/container'
import { CardsSelect, MaskedTextField } from 'src/components/shared'

import {
  AttachMoneyIcon,
  CachedIcon,
  PlaylistAddIcon,
  ThumbDownOutlinedIcon,
  ThumbUpOutlinedIcon,
} from 'src/assets/icons'
import { ContainedIconButton, ProductionContainer, Wrapper } from 'src/styles/proposal-register'

const checkProposalCategoryHasQuestions = (proposalCategory: ProposalCategory) => {
  if (proposalCategory === ProposalCategory.waste) return true
}

type ProposalRegisterProps = {
  user: User
}

const ProposalRegister: NextPage<ProposalRegisterProps> = ({ user }) => {
  const formMethods = useForm<ProposalSchema>({
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
  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { toggleLoading } = useLoadingBackdrop()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = formMethods

  const watchedProposalCategory = watch('proposalCategory')
  const watchedProposalType = watch('proposalType')

  const [keywordsInputValue, setKeywordsInputValue] = useState('')

  const previousStep = useRef(0)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const { suggestions, feedbacks, getAllSuggestions, handleSuggestionFeedback, getCustomCheck } = useProposalRegister(
    previousStep.current + 1,
    getValues
  )

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') nextButtonRef.current?.click()
  }

  const onSubmit = (data: ProposalSchema) => {
    const proposal = {
      ...data,
      budget: Number(data.budget?.replaceAll('.', '')),
    }
    try {
      toggleLoading()
      // TODO: Remove this when the API is ready
      axios.post('https://api.jsonbin.io/v3/b', proposal, {
        headers: {
          'X-Master-Key': '$2b$10$AZS8O9vbnQ22oOD6kb3cDucYvYwySweKMgOCr5voMV51D/zKISEt6',
          'X-Bin-Name': data.title,
        },
      })
      toast.show('Proposta cadastrada com sucesso!', 'success')
    } catch (error) {
      toast.show('Não foi possível cadastrar a proposta. Tente novamente mais tarde.', 'error')
      console.error(error)
    } finally {
      toggleLoading()
    }
  }

  return (
    <FormProvider {...formMethods}>
      <Layout documentTitle="Cadastro de Proposta">
        <Wrapper>
          <Container component="form" onSubmit={handleSubmit(onSubmit)}>
            <Wizard
              wrapper={<AnimatePresence initial={false} mode="wait" />}
              footer={<WizardFooter nextButtonRef={nextButtonRef} handleCustomCheck={getCustomCheck()} />}
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
                  sx={{ mb: 4 }}
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
                    placeholder="Categoria"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PlaylistAddIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
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
                <Typography variant="h2" mb={1} textAlign="center">
                  Tipo da Proposta
                </Typography>
                <Typography mb={4} textAlign="center">
                  Define como você está aberto a negociar com as empresas, você pode escolher mais de uma opção.
                </Typography>

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

                <Collapse
                  in={
                    watchedProposalType?.includes(ProposalType.research) ||
                    watchedProposalType?.includes(ProposalType.buyOrSell)
                  }
                  sx={{ marginTop: 2 }}
                >
                  <MaskedTextField
                    label="Qual o seu orçamento?"
                    placeholder="Orçamento"
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
                    {...register('budget')}
                    error={!!errors.budget}
                    helperText={errors.budget?.message}
                    size={'small' as any}
                    fullWidth
                  />
                </Collapse>
              </AnimatedStep>

              <AnimatedStep previousStep={previousStep}>
                <Typography variant="h2" mb={1} textAlign="center">
                  Descrição do projeto
                </Typography>
                <Typography mb={4} textAlign="center">
                  A descrição do projeto ajudará as empresas a melhor entender o contexto do problema.
                </Typography>
                <TextField
                  placeholder="Descreva o projeto"
                  variant="standard"
                  {...register('projectDescription')}
                  inputProps={{ maxLength: maxLengths.projectDescription }}
                  helperText={
                    errors.projectDescription?.message ||
                    `${watch('projectDescription')?.length || 0}/${maxLengths.projectDescription}`
                  }
                  error={!!errors.projectDescription}
                  multiline
                  fullWidth
                />
              </AnimatedStep>

              <AnimatedStep previousStep={previousStep}>
                <Typography variant="h2" mb={1} textAlign="center">
                  Descrição da proposta
                </Typography>
                <Typography mb={4} textAlign="center">
                  A objetivo da descrição da proposta é explicar o problema que deseja-se resolver. Forneça o máximo de
                  detalhes possível, porém de forma objetiva.
                </Typography>

                <TextField
                  label="Descreva de maneira detalhada o que deseja-se resolver."
                  variant="standard"
                  placeholder="Descreva o problema"
                  {...register('proposalDescription')}
                  inputProps={{ maxLength: maxLengths.proposalDescription }}
                  helperText={
                    errors.proposalDescription?.message ||
                    `${watch('proposalDescription')?.length || 0}/${maxLengths.proposalDescription}`
                  }
                  error={!!errors.proposalDescription}
                  multiline
                  fullWidth
                />

                <Collapse in={!!suggestions?.proposal?.length}>
                  <Box mt={4} pt={4} px={4} pb={2} borderRadius={5} bgcolor="#faf0ea">
                    <Typography variant="h3" mb={1}>
                      Sugestões de melhorias para descrição da sua proposta geradas por uma Inteligência Artificial
                    </Typography>
                    <Typography mb={2}>
                      Caso façam sentido, utilize-as para melhorar a descrição da sua proposta. Pressione
                      &apos;Próximo&apos; para prosseguir.
                    </Typography>

                    <ul aria-label="Lista de sugestões de melhorias para descrição da sua proposta">
                      {suggestions?.proposal?.map((item, index) => (
                        <li key={index}>
                          <Typography>{item}</Typography>
                        </li>
                      ))}
                    </ul>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={3}>
                      <Tooltip title="Gerar novas sugestões">
                        <ContainedIconButton
                          onClick={() => {
                            handleOpenConfirmDialog({
                              title: 'Gerar novas sugestões',
                              // TODO: Implements the request IA limit
                              message:
                                'Gerar sugestões com a IA tem um custo para nós, por isso limitamos a 3 usos por dia. Este será o uso 2/3.',
                              confirmButton: {
                                onClick: getAllSuggestions,
                              },
                            })
                          }}
                          size="small"
                        >
                          <CachedIcon fontSize="small" />
                        </ContainedIconButton>
                      </Tooltip>
                      <Tooltip title="Sugestões foram úteis">
                        <IconButton
                          color={feedbacks?.proposal === 'good' ? 'success' : undefined}
                          onClick={() => handleSuggestionFeedback('proposal', 'good')}
                          size="small"
                          sx={{ ml: 2 }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Sugestões não foram úteis">
                        <IconButton
                          color={feedbacks?.proposal === 'bad' ? 'error' : undefined}
                          onClick={() => handleSuggestionFeedback('proposal', 'bad')}
                          size="small"
                        >
                          <ThumbDownOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Collapse>
              </AnimatedStep>

              <AnimatedStep previousStep={previousStep}>
                <Typography variant="h2" mb={0.5} textAlign="center">
                  Palavras Chaves
                </Typography>
                <Typography mb={4} textAlign="center">
                  Palavras chaves nos ajudarão a identificar soluções ou conexões para sua proposta.
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
                        if (inputValue.length > 1 && [',', ';'].includes(inputValue[inputValue.length - 1])) {
                          onChange([...value, inputValue.slice(0, -1)])
                          return setKeywordsInputValue('')
                        }
                        if (inputValue.match(/^[a-zA-Z0-9\u00C0-\u00FF\-\s]+$/i) || inputValue === '') {
                          setKeywordsInputValue(inputValue)
                        }
                      }}
                      clearText="Limpar"
                      freeSolo
                      multiple
                    />
                  )}
                />

                <Collapse in={!!suggestions?.keywords?.length}>
                  <Box mt={4} pt={4} px={4} pb={2} borderRadius={5} bgcolor="#faf0ea">
                    <Typography variant="h3" mb={1}>
                      Sugestões de Palavras Chaves geradas por uma Inteligência Artificial
                    </Typography>
                    <Typography mb={2}>Clique para selecionar.</Typography>

                    <Stack
                      component="ul"
                      aria-label="Lista de sugestões de palavras chaves."
                      m={0}
                      p={0}
                      direction="row"
                      flexWrap="wrap"
                      gap={1}
                      sx={{ listStyle: 'none' }}
                    >
                      {suggestions?.keywords?.map(keyword => (
                        <li key={keyword}>
                          <Chip
                            label={keyword}
                            onClick={() => setValue('keywords', [...getValues('keywords'), keyword])}
                          />
                        </li>
                      ))}
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={3}>
                      <Tooltip title="Sugestões foram úteis">
                        <IconButton
                          color={feedbacks?.keywords === 'good' ? 'success' : undefined}
                          onClick={() => handleSuggestionFeedback('keywords', 'good')}
                          size="small"
                          sx={{ ml: 2 }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Sugestões não foram úteis">
                        <IconButton
                          color={feedbacks?.keywords === 'bad' ? 'error' : undefined}
                          onClick={() => handleSuggestionFeedback('keywords', 'bad')}
                          size="small"
                        >
                          <ThumbDownOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Collapse>
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

                <Collapse in={!!suggestions?.trl}>
                  <Box mt={4} pt={4} px={4} pb={2} borderRadius={5} bgcolor="#faf0ea">
                    <Typography variant="h3" mb={1}>
                      Sugestão da métrica TRL gerada por uma Inteligência Artificial
                    </Typography>
                    <Typography color="text.secondary">
                      A IA pode utilizar uma métrica levemente diferente da apresentada nos cartões, analise e selecione
                      a que melhor se encaixa.
                    </Typography>

                    <Typography mt={2}>{suggestions.trl}</Typography>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={3}>
                      <Tooltip title="Sugestão foi útil">
                        <IconButton
                          color={feedbacks?.trl === 'good' ? 'success' : undefined}
                          onClick={() => handleSuggestionFeedback('trl', 'good')}
                          size="small"
                          sx={{ ml: 2 }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Sugestão não foi útil">
                        <IconButton
                          color={feedbacks?.trl === 'bad' ? 'error' : undefined}
                          onClick={() => handleSuggestionFeedback('trl', 'bad')}
                          size="small"
                        >
                          <ThumbDownOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Collapse>
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

                      const { production, testHasBeenPerformed, toxicity } = proposalAdditionalQuestions['waste']

                      return (
                        <>
                          <Controller
                            name="categoryQuestions.waste.testHasBeenPerformed"
                            control={control}
                            render={({ field }) => (
                              <FormControl error={!!wasteErrors?.testHasBeenPerformed} sx={{ marginTop: 4 }} fullWidth>
                                <FormLabel id="test-has-been-performed-label" sx={{ color: 'text.primary' }}>
                                  {testHasBeenPerformed}
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
                                <FormLabel id="toxicity-label" color="primary">
                                  {toxicity}
                                </FormLabel>
                                <RadioGroup aria-labelledby="toxicity-label" defaultValue={null} {...field} row>
                                  <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                  <FormControlLabel value={false} control={<Radio />} label="Não" />
                                </RadioGroup>
                                <FormHelperText>
                                  {wasteErrors?.toxicity && wasteErrors?.toxicity?.message}
                                </FormHelperText>
                              </FormControl>
                            )}
                          />

                          <FormLabel htmlFor="production-volume" sx={{ mt: 4 }}>
                            {production}
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
      </Layout>
    </FormProvider>
  )
}

export default ProposalRegister

// export const getServerSideProps: GetServerSideProps = withAuth(async context => ({
//   props: {
//     user: context.session.user,
//   },
// }))

const maxLengths = {
  projectDescription: 1000,
  proposalDescription: 2000,
}
