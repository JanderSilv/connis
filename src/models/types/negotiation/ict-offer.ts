import { ICTOfferStatus } from 'src/models/enums'
import { ICTUser } from '../user'

export type ICTOffer = {
  id: string
  proposalId: string
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  ict: ICTUser
  suggestedFundingAgencies: string[]
  status: ICTOfferStatus
}
