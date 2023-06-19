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
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'

import { OrderDirection, ProposalCategory, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { ProposalsConfig } from './models'

import { brazilianStates } from 'src/data/brazilian-states'
import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal'
import { useListProposals } from './useListProposals'
import { proposalsFiltersSchema, ProposalsFilters } from './validations'

import { MaskedTextField, OrderDirectionButton } from 'src/components/shared'

import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from 'src/assets/icons'
import { Checkbox, FormControl, FormLabel } from 'src/styles/proposals'

type ProposalsFiltersConfig = ProposalsConfig

type ProposalFiltersProps = {
  form: UseFormReturn<ProposalsFilters>
  config?: ProposalsConfig
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

const ProposalsFiltersComponent = ({ form, config }: ProposalFiltersProps) => {
  const [shouldShowTRLs, setShouldShowTRLs] = useState(false)

  const {
    register,
    control,
    watch,
    formState: { errors },
    reset,
  } = form

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
        {...register('contains')}
        size="small"
        fullWidth
      />

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField label="Estado" {...field} size="small" fullWidth select>
            {brazilianStates.map(option => (
              <MenuItem key={option.uf} value={option.uf}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
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
                    name="category"
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

      {(config?.organization === 'company' || config?.fetchAllTypes) && (
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
                      name="type"
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
      )}

      <Collapse in={watch('type').includes(ProposalType.buyOrSell)} mountOnEnter>
        <Box>
          <FormLabel>Valor da proposta</FormLabel>
          <Stack mt={1.5} direction="row" spacing={1}>
            <Controller
              name="minBudget"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <MaskedTextField
                  label="Valor mínimo"
                  value={value?.toString()}
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
                    name="trl"
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

export const useProposalsFilters = (initialProposals: Proposal[], config?: ProposalsFiltersConfig) => {
  const [filters, setFilters] = useState<ProposalsFilters>()

  const form = useForm<ProposalsFilters>({
    resolver: zodResolver(proposalsFiltersSchema),
    defaultValues: {
      state: '',
      category: [],
      type: [],
      trl: [],
      orderDirection: OrderDirection.Desc,
    },
  })

  const { control, watch } = form

  const { proposals, ...useListRest } = useListProposals(initialProposals, filters, config)

  const submitTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const subscription = watch(fields => {
      const submitTimer = submitTimerRef.current
      if (submitTimer) clearTimeout(submitTimer)

      submitTimerRef.current = setTimeout(() => setFilters(fields as any), 1000)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return {
    filteredProposals: proposals,
    ProposalsFilters: useCallback(() => <ProposalsFiltersComponent form={form} config={config} />, [config, form]),
    OrderDirectionButton: useCallback(
      () => (
        <Controller
          control={control}
          name="orderDirection"
          render={({ field: { onChange, ...rest } }) => <OrderDirectionButton onClick={onChange} {...rest} />}
        />
      ),
      [control]
    ),
    ...useListRest,
  }
}
