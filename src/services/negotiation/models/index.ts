import { Pagination } from 'src/models/types'

export type NegotiationInput = {
  companyId: string
  proposalId: string
}

export type NegotiationsParams = Partial<{
  proposalId: string
  companyProponentId: string
  companyInterestedId: string
  iCTInterestedId: string
  categories: string[]
  onFormalization: boolean
}> &
  Pagination
