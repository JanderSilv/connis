import { useSession } from 'next-auth/react'
import { Proposal } from 'src/models/types'

export const useProposalSession = (proposal: Proposal) => {
  const { data: session, status } = useSession()
  const userIsTheOwner = session?.user.id === proposal.company.id

  return {
    session,
    status,
    userIsTheOwner,
  }
}
