import { ProposalCategory, ProposalStatus, ProposalType, TRL } from 'src/models/enums'
import { Pagination, Proposal } from 'src/models/types'
import { ProposalSchema } from 'src/validations/proposal-register'

export type ProposalInput = Omit<ProposalSchema, 'budget'> & {
  budget?: number
  companyId: string
  userProponentId: string
}

export type ProposalsParams = Partial<{
  contains: string
  trl: TRL[]
  category: ProposalCategory[]
  type: ProposalType[]
  status: ProposalStatus[]
  minBudget: number
  maxBudget: number
  companyId: string
}> &
  Pagination<Proposal>

export type ProposalUpdateInput = Partial<Proposal>
