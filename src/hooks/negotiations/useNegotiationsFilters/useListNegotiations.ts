import useSWRInfinite from 'swr/infinite'

import { Negotiation } from 'src/models/types'

import { NegotiationsParams, negotiationService } from 'src/services'
import { NegotiationsConfig } from './models'

export const useListNegotiations = (
  initialNegotiations: Negotiation[],
  params?: NegotiationsParams,
  config?: NegotiationsConfig
) => {
  const {
    data,
    error,
    size,
    setSize,
    mutate,
    isLoading: isFetching,
  } = useSWRInfinite(
    index => [
      `${negotiationService.baseUrl}?page=${index}&pageSize=12`,
      {
        ...config?.defaultParams,
        ...params,
      },
    ],
    negotiationService.listFetcher,
    {
      fallbackData: [initialNegotiations],
      revalidateOnMount: initialNegotiations.length === 0,
      revalidateOnFocus: false,
    }
  )

  const negotiations = data ? data.flat() : []
  const isLoading = !data && !error
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 12)

  return { negotiations, error, isLoading, isLoadingMore, isEmpty, isReachingEnd, size, setSize, mutate, isFetching }
}
