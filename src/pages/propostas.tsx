import { useEffect, useRef, useState, ComponentProps } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Collapse,
  Container,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { ProposalCategory, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal'
import { proposalsFiltersSchema, ProposalsFilters } from 'src/validations/proposals'

import { ProposalCard } from 'src/components/proposal'
import { MaskedTextField } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from 'src/assets/icons'
import { Checkbox, FormControl, FormLabel, Wrapper } from 'src/styles/proposals'

type Props = {
  proposals: Proposal[]
}

const budgetFieldProps: ComponentProps<typeof MaskedTextField> = {
  mask: Number,
  inputMode: 'numeric',
  radix: ',',
  mapToRadix: ['.'],
  thousandsSeparator: '.',
  scale: 0,
  InputProps: {
    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
  },
  size: 'small' as any,
  variant: 'outlined',
  fullWidth: true,
  signed: false,
  unmask: true as any,
}

const Proposals: NextPage<Props> = ({ proposals }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<ProposalsFilters>({
    resolver: zodResolver(proposalsFiltersSchema),
    defaultValues: {
      categories: [],
      types: [],
      trls: [],
      minBudget: 1000,
    },
  })

  const [shouldShowTRLs, setShouldShowTRLs] = useState(false)

  const submitTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleFiltersSubmit = (data: ProposalsFilters) => {
      // TODO: implement filters submit
      console.log({ data })
    }

    const subscription = watch(() => {
      const submitTimer = submitTimerRef.current
      if (submitTimer) clearTimeout(submitTimer)

      submitTimerRef.current = setTimeout(() => handleSubmit(handleFiltersSubmit)(), 1000)
    })
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  return (
    <Layout documentTitle="Catálogo de Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Catálogo de Propostas
      </Typography>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <Stack component="form" minWidth={250} maxWidth={{ md: 300 }} position="sticky" top={32} gap={2}>
            <TextField
              variant="outlined"
              label="Pesquise um termo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              {...register('search')}
              size="small"
              fullWidth
            />

            <FormControl>
              <FormLabel>Categorias</FormLabel>
              <FormGroup>
                {proposalCategoryOptions.map(category => {
                  if (category.id === ProposalCategory.others) return null
                  return (
                    <FormControlLabel
                      key={category.id}
                      label={category.title}
                      control={
                        <Controller
                          name="categories"
                          control={control}
                          render={({ field: { value, onChange, ...rest } }) => (
                            <Checkbox
                              checked={value.includes(category.id)}
                              onChange={e =>
                                onChange(
                                  e.target.checked ? [...value, category.id] : value.filter(id => id !== category.id)
                                )
                              }
                              {...rest}
                            />
                          )}
                        />
                      }
                    />
                  )
                })}
              </FormGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <FormGroup>
                {proposalTypeOptions.map(type => {
                  if (type.id === ProposalType.research) return null
                  return (
                    <FormControlLabel
                      key={type.id}
                      label={type.title}
                      control={
                        <Controller
                          name="types"
                          control={control}
                          render={({ field: { value, onChange, ...rest } }) => (
                            <Checkbox
                              checked={value.includes(type.id)}
                              onChange={e =>
                                onChange(e.target.checked ? [...value, type.id] : value.filter(id => id !== type.id))
                              }
                              {...rest}
                            />
                          )}
                        />
                      }
                    />
                  )
                })}
              </FormGroup>
            </FormControl>

            <Collapse in={watch('types').includes(ProposalType.buyOrSell)}>
              <Box>
                <FormLabel>Orçamento</FormLabel>
                <Stack mt={1.5} direction="row" spacing={1}>
                  <Controller
                    name="minBudget"
                    control={control}
                    render={({ field: { value, onChange, ...rest } }) => (
                      <MaskedTextField
                        label="Valor mínimo"
                        value={value.toString()}
                        onAccept={newValue => onChange(Number(newValue))}
                        error={!!errors.maxBudget}
                        {...budgetFieldProps}
                        {...rest}
                      />
                    )}
                  />
                  <Controller
                    name="maxBudget"
                    control={control}
                    render={({ field: { value, onChange, ...rest } }) => (
                      <MaskedTextField
                        label="Valor máximo"
                        value={value?.toString()}
                        onAccept={newValue => onChange(Number(newValue))}
                        error={!!errors.maxBudget}
                        {...budgetFieldProps}
                        {...rest}
                      />
                    )}
                  />
                </Stack>
                <FormHelperText error={!!errors.minBudget || !!errors.maxBudget}>
                  {errors.minBudget?.message || errors.maxBudget?.message}
                </FormHelperText>
              </Box>
            </Collapse>

            <FormControl>
              <FormLabel>TRL</FormLabel>
              <Collapse in={shouldShowTRLs} collapsedSize={45}>
                <FormGroup row>
                  {trlOptions.map(trl => (
                    <FormControlLabel
                      key={trl.id}
                      label={trl.label}
                      control={
                        <Controller
                          name="trls"
                          control={control}
                          render={({ field: { value, onChange, ...rest } }) => (
                            <Checkbox
                              checked={value.includes(trl.id)}
                              onChange={e =>
                                onChange(e.target.checked ? [...value, trl.id] : value.filter(id => id !== trl.id))
                              }
                              {...rest}
                            />
                          )}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Collapse>
              <Button
                variant="text"
                endIcon={!shouldShowTRLs ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                onClick={() => setShouldShowTRLs(prevState => !prevState)}
                sx={{ maxWidth: 'fit-content', textTransform: 'initial' }}
              >
                {!shouldShowTRLs ? 'Ver todos' : 'Ver menos'}
              </Button>
            </FormControl>
          </Stack>
        </Box>

        <Container component="main" maxWidth="xl">
          <Grid container spacing={2}>
            {[...proposals, ...proposals].map(proposal => (
              <Grid key={proposal.id} item sm={6} lg={4} xl={3}>
                <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Proposals

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: fetch proposals from API
  const { myProposals } = fakeData

  return {
    props: {
      proposals: myProposals,
    },
  }
}
