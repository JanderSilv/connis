import useSWRInfinite from 'swr/infinite'

import { Proposal } from 'src/models/types'
import { ProposalsConfig } from './models'

import { getProposalTypes } from './helpers'

import { ProposalsParams, proposalService } from 'src/services/proposal'

export const useListProposals = (initialProposals: Proposal[], params?: ProposalsParams, config?: ProposalsConfig) => {
  const {
    data,
    error,
    size,
    setSize,
    mutate,
    isLoading: isFetching,
  } = useSWRInfinite(
    index => [
      `${proposalService.baseUrl}?page=${index + 1}&pageSize=12`,
      {
        ...config?.defaultParams,
        ...params,
        type: getProposalTypes(params, config),
      },
    ],
    proposalService.listFetcher,
    {
      fallbackData: [initialProposals],
      revalidateOnMount: initialProposals.length === 0,
      revalidateOnFocus: false,
    }
  )

  const proposals = data ? data.flat() : []
  const isLoading = !data && !error
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 12)

  return { proposals, error, isLoading, isFetching, isLoadingMore, isEmpty, isReachingEnd, size, setSize, mutate }
}
