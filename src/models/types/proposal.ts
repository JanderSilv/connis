import { ProposalCategory, ProposalStatus, ProposalType, TRL } from '../enums'
import { CompanyUser, ICTUser } from './user'

export type ProposalWasteQuestions = {
  testHasBeenPerformed?: boolean
  toxicity?: boolean
  production: {
    volume?: string
    unit?: string
    periodicity?: string
  }
}

export type Proposal = {
  id: string
  title: string
  company: CompanyUser
  createdAt: string
  updatedAt?: string
  offerCompany?: CompanyUser | ICTUser
  proposalCategory: ProposalCategory
  proposalCategoryOther?: string
  projectDescription?: string
  proposalDescription: string
  keywords: string[]
  trl: TRL
  goalTrl: TRL
  proposalType: ProposalType[]
  budget?: number
  status: ProposalStatus
  categoryQuestions: {
    waste?: ProposalWasteQuestions
  }
  views?: number
  viewed: boolean
  unseenActivities?: number
}
