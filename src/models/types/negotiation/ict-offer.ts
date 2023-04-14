import { ICTOfferStatus } from 'src/models/enums'
import { ICTUser } from '../user'

export type ICTOffer = {
  id: string
  proposalId: string
  description: string
  createdAt: string
  updatedAt?: string
  user: ICTUser
  suggestedFundingAgencies: string[]
  status: ICTOfferStatus
}
