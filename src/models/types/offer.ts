import { OfferStatus } from '../enums'
import { Company } from './company'
import { User } from './user'

export type Offer = {
  id: string
  description: string
  userProponent: User
  company: Company
  offerStatus: OfferStatus
  proposalType: number
  suggestion: ProposalChangeSuggestion
  createdAt: string
  updatedAt?: string
  viewed: boolean
}

export type ProposalChangeSuggestion = {
  trl?: number
  goalTrl?: number
  budget?: number
}
