import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Proposal } from 'src/models/types'

export const useProposalSession = (proposal: Proposal, serverSession?: Session) => {
  const { data: session, status } = useSession()

  if (serverSession)
    return {
      userIsTheProposalOwner: serverSession?.user.id === proposal.company.id,
    }

  return {
    session: session,
    status,
    userIsTheProposalOwner: session?.user.id === proposal.company.id,
  }
}
