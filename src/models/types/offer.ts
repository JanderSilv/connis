import { OfferCategory, OfferStatus, ProposalType, TRL } from '../enums'
import { Proposal } from './proposal'
import { CompanyUser, ICTUser } from './user'

export type Offer = {
  id: string
  proposalId: string
  createdAt: string
  updatedAt?: string
  user: CompanyUser | ICTUser
  description: string
  category: OfferCategory
  status: OfferStatus
  type: ProposalType
  viewed: boolean
  budget?: number
  trl: TRL
  goalTRL: TRL
  proposal?: Proposal
}
