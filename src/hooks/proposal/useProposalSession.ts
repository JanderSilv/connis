import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Proposal } from 'src/models/types'

export const useProposalSession = (proposal: Proposal, serverSession?: Session) => {
  const { data: session, status } = useSession()

  if (serverSession)
    return {
      session: serverSession,
      status: 'authenticated',
      userIsTheProposalOwner: serverSession?.user.companyId === proposal.company.id,
    }

  return {
    session: session,
    status,
    userIsTheProposalOwner: session?.user.companyId === proposal.company.id,
  }
}
