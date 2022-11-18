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
  id: number
  title: string
  createdAt: string
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
}

export * from './company'
