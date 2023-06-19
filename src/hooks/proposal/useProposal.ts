import useSWR from 'swr'
import useImmutableSWR from 'swr/immutable'
import { negotiationService, proposalService } from 'src/services'

export const useProposal = (proposalId: string, userIsTheProposalOwner: boolean) => {
  const { data: negotiations } = useSWR(
    userIsTheProposalOwner
      ? [
          `${negotiationService.baseUrl}/negotiations`,
          {
            proposalId,
          },
        ]
      : null,
    negotiationService.listFetcher
  )
  const { data: similarProposals } = useImmutableSWR(
    userIsTheProposalOwner ? [`${proposalService.baseUrl}/${proposalId}/similars`, proposalId] : null,
    proposalService.getSimilarProposalsFetcher
  )

  return {
    negotiations,
    similarProposals,
  }
}
