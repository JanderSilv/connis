import { OfferCategory, OfferStatus, ProposalType, TRL } from '../enums'
import { Proposal } from './proposal'
import { CompanyUser, ICTUser } from './user'

export type Offer = {
  id: number
  proposalId: number
  createdAt: string
  updatedAt?: string
  company: CompanyUser | ICTUser
  message: string
  category: OfferCategory
  status: OfferStatus
  type: ProposalType
  viewed: boolean
  budget?: number
  trl?: TRL
  goalTRL?: TRL
}

export type OfferWithProposal = Offer & {
  proposal: Proposal
}
