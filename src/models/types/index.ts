import { ProposalCategory, ProposalType, TRL } from '../enums'

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
    waste?: {
      testHasBeenPerformed?: boolean
      toxicity?: boolean
      production: {
        volume?: string
        unit?: string
        periodicity?: string
      }
    }
  }
}

export * from './company'
