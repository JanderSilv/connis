import { useEffect, useRef, useState, ComponentProps, useCallback, Dispatch, SetStateAction } from 'react'
import { Controller, useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'

import { ProposalCategory, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal'
import { proposalsFiltersSchema, ProposalsFilters } from './validations'

import { MaskedTextField } from 'src/components/shared'

import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from 'src/assets/icons'
import { Checkbox, FormControl, FormLabel } from 'src/styles/proposals'

type ProposalFiltersProps = {
  form: UseFormReturn<ProposalsFilters>
  setProposals: Dispatch<SetStateAction<Proposal[]>>
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

const ProposalsFiltersComponent = ({ form, setProposals }: ProposalFiltersProps) => {
  const [shouldShowTRLs, setShouldShowTRLs] = useState(false)

  const submitTimerRef = useRef<NodeJS.Timeout>()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = form

  useEffect(() => {
    const handleFiltersSubmit = (data: ProposalsFilters) => {
      // TODO: implement filters submit
      console.log({ data })
      setProposals(prevProposals => prevProposals)
    }

    const subscription = watch(() => {
      const submitTimer = submitTimerRef.current
      if (submitTimer) clearTimeout(submitTimer)

      submitTimerRef.current = setTimeout(() => handleSubmit(handleFiltersSubmit)(), 1000)
    })
    return () => subscription.unsubscribe()
  }, [handleSubmit, setProposals, watch])

  return (
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
                          onChange(e.target.checked ? [...value, category.id] : value.filter(id => id !== category.id))
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
          <FormLabel>Valor da proposta</FormLabel>
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

      <Button variant="outlined" color="primary" onClick={() => reset()} size="small">
        Limpar filtros
      </Button>
    </Stack>
  )
}

export const useProposalsFilters = (initialProposals: Proposal[]) => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)

  const form = useForm<ProposalsFilters>({
    resolver: zodResolver(proposalsFiltersSchema),
    defaultValues: {
      categories: [],
      types: [],
      trls: [],
      minBudget: 1000,
    },
  })

  return {
    filteredProposals: proposals,
    ProposalsFilters: useCallback(() => <ProposalsFiltersComponent form={form} setProposals={setProposals} />, [form]),
  }
}
