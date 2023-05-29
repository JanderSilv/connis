import { ICTOfferStatus } from 'src/models/enums'
import { User } from '../user'
import { ICT } from '../ict'

export type ICTOffer = {
  id: string
  description: string
  createdAt: string
  updatedAt?: string
  userProponent: User
  ict: ICT
  fundingAgencies: string[]
  status: ICTOfferStatus
}
