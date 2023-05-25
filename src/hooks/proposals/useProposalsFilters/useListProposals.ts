import useSWRInfinite from 'swr/infinite'

import { Proposal } from 'src/models/types'

import { ProposalsParams, proposalService } from 'src/services/proposal'

export const useListProposals = (initialProposals: Proposal[], params?: ProposalsParams) => {
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    index => [`${proposalService.baseUrl}?page=${index}&pageSize=12`, params],
    proposalService.getAllFetcher,
    {
      fallbackData: [initialProposals],
      revalidateOnMount: false,
    }
  )

  const proposals = data ? data.flat() : []
  const isLoading = !data && !error
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 12)

  return { proposals, error, isLoading, isLoadingMore, isEmpty, isReachingEnd, size, setSize, mutate }
}
