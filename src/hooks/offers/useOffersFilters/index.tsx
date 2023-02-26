import { useEffect, useRef, useState, ComponentProps, useCallback, Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chip, InputAdornment, Stack, TextField } from '@mui/material'

import { Offer } from 'src/models/types'

import { offerStatusOptions } from 'src/data/offer'
import { offersFiltersSchema, OffersFilters } from './validations'

import { SearchIcon } from 'src/assets/icons'
import { FormControl, FormLabel } from 'src/styles/proposals'

type OffersFiltersProps = {
  setOffers: Dispatch<SetStateAction<Offer[]>>
}

const OffersFiltersComponent = ({ setOffers }: OffersFiltersProps) => {
  const { control, handleSubmit, register, watch } = useForm<OffersFilters>({
    resolver: zodResolver(offersFiltersSchema),
    defaultValues: {
      status: [],
    },
  })

  const submitTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleFiltersSubmit = (data: OffersFilters) => {
      // TODO: implement filters submit
      console.log({ data })
      setOffers(prevOffers => prevOffers)
    }

    const subscription = watch(() => {
      const submitTimer = submitTimerRef.current
      if (submitTimer) clearTimeout(submitTimer)

      submitTimerRef.current = setTimeout(() => handleSubmit(handleFiltersSubmit)(), 1000)
    })
    return () => subscription.unsubscribe()
  }, [handleSubmit, setOffers, watch])

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
        <FormLabel>Situação</FormLabel>
        <Stack mt={1} direction="row" flexWrap="wrap" gap={1}>
          {offerStatusOptions.map(status => (
            <Controller
              key={status.id}
              name="status"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Chip
                  label={status.label}
                  color={
                    value?.includes(status.id)
                      ? (status.color.split('.')[0] as ComponentProps<typeof Chip>['color'])
                      : 'default'
                  }
                  onClick={() =>
                    onChange(value?.includes(status.id) ? value.filter(id => id !== status.id) : [...value, status.id])
                  }
                  {...rest}
                />
              )}
            />
          ))}
        </Stack>
      </FormControl>
    </Stack>
  )
}

export const useOffersFilters = (initialOffers: Offer[]) => {
  const [offers, setOffers] = useState<Offer[]>(initialOffers)

  return {
    filteredOffers: offers,
    OffersFilters: useCallback(() => <OffersFiltersComponent setOffers={setOffers} />, []),
  }
}
