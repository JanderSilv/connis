import { ProposalType, TRL } from 'src/models/enums'
import { Offer, Pagination } from 'src/models/types'

export type OfferInput = {
  description: string
  negotiationId: string
  userProponentId: string
  companyProponentId: string
  proposalType: ProposalType
  suggestions?: {
    trl?: TRL
    goalTrl?: TRL
    budget?: number
  }
}

export type OfferUpdateInput = Omit<OfferInput, 'userProponentId' | 'companyProponentId' | 'offerId'>

export type MakeOfferResponse = {
  negotiationId: string
  offerId: string
}

export type OfferParams = Partial<{
  companyProponentId: string
  userProponentId: string
  description: string
  negotiationId: string
}> &
  Pagination<Offer>
