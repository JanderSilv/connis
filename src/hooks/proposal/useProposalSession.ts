import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { Proposal } from 'src/models/types'

import { useRouter } from 'next/navigation'

import { ProposalType } from 'src/models/enums'

import { pages } from 'src/constants'
import { checkUserIsCompany } from 'src/helpers/users'
import { proposalService } from 'src/services'

export const useProposalSession = (proposal: Proposal, serverSession?: Session) => {
  const { data: session, status } = useSession()
  const { replace } = useRouter()

  const userId = serverSession?.user.id || session?.user.id
  const userCompanyId = serverSession?.user.companyId || session?.user.companyId
  const userIsTheProposalOwner = userCompanyId === proposal.company.id

  useEffect(() => {
    const checkUserCanAccessProposal = () => {
      if (checkUserIsCompany(session?.user) && proposal.types.includes(ProposalType.research)) replace(pages.proposals)
    }

    if (!userIsTheProposalOwner) checkUserCanAccessProposal()
  }, [proposal.types, replace, session?.user, userIsTheProposalOwner])

  useEffect(() => {
    const viewProposal = async () => {
      if (!userId) return
      await proposalService.view(proposal.id, userId)
    }

    if (!userIsTheProposalOwner) viewProposal()
  }, [proposal.id, userId, userIsTheProposalOwner])

  if (serverSession)
    return {
      session: serverSession,
      status: 'authenticated',
      userIsTheProposalOwner: userIsTheProposalOwner,
    }

  return {
    session: session,
    status,
    userIsTheProposalOwner,
  }
}
