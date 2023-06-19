import { useEffect, useRef, useState, useCallback, Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'

import { OrderDirection } from 'src/models/enums'
import { Negotiation } from 'src/models/types'
import { NegotiationsConfig } from './models'

import { useListNegotiations } from './useListNegotiations'
import { negotiationsFiltersSchema, NegotiationsFilters } from './validations'

import { OrderDirectionButton } from 'src/components/shared'

type NegotiationsFiltersConfig = NegotiationsConfig

const NegotiationsFiltersComponent = () => {
  return <Stack component="form" minWidth={250} maxWidth={{ md: 300 }} position="sticky" top={32} gap={2} />
}

export const useNegotiationsFilters = (initialNegotiations: Negotiation[], config?: NegotiationsFiltersConfig) => {
  const [filters, setFilters] = useState<NegotiationsFilters>()

  const { control, handleSubmit, watch } = useForm<NegotiationsFilters>({
    resolver: zodResolver(negotiationsFiltersSchema),
    defaultValues: {
      orderDirection: OrderDirection.Desc,
    },
  })

  const { negotiations, ...useListNegotiationsRest } = useListNegotiations(initialNegotiations, filters, config)

  const submitTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const subscription = watch(fields => {
      const submitTimer = submitTimerRef.current
      if (submitTimer) clearTimeout(submitTimer)

      submitTimerRef.current = setTimeout(() => setFilters(fields as any), 1000)
    })
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  return {
    filteredNegotiations: negotiations,
    NegotiationsFilters: useCallback(() => <NegotiationsFiltersComponent />, []),
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
    ...useListNegotiationsRest,
  }
}
