import { ProposalCategory, ProposalStatus, ProposalType, TRL } from '../enums'
import { Company } from './company'

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
  company: Company
  createdAt: string
  updatedAt?: string
  userProponentId?: string
  category: ProposalCategory
  categoryOther?: string
  projectDescription?: string
  description: string
  keywords: string[]
  trl: TRL
  goalTrl: TRL
  types: ProposalType[]
  budget?: number
  status: ProposalStatus
  categoryQuestions?: {
    waste?: ProposalWasteQuestions
  }
  views?: number
  viewed: boolean
  unseenActivities?: number
}
