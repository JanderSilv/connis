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
  category: ProposalCategory
  categoryOther?: string
  projectDescription?: string
  description: string
  keywords: string[]
  trl: TRL
  goalTrl: TRL
  type: ProposalType[]
  budget?: number
  status: ProposalStatus
  categoryQuestions: {
    waste?: ProposalWasteQuestions
  }
  views?: number
  viewed: boolean
  unseenActivities?: number
}
