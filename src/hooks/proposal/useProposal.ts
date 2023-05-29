import { proposalService } from 'src/services'
import useImmutableSWR from 'swr/immutable'

export const useProposal = (proposalId: string, userIsTheProposalOwner: boolean) => {
  const { data: negotiations } = useImmutableSWR(
    userIsTheProposalOwner ? `${proposalService.baseUrl}/${proposalId}/negotiations` : null,
    proposalService.getNegotiationsFetcher
  )

  return {
    negotiations,
  }
}
