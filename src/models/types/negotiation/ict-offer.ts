import { ICTOfferStatus } from 'src/models/enums'
import { ICTUser } from '../user'

export type ICTOffer = {
  id: number
  proposalId: number
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  ict: ICTUser
  suggestedFundingAgencies: string[]
  status: ICTOfferStatus
}
