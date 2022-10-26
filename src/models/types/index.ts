import { ProposalCategory, ProposalType, TRL } from '../enums'

export type Proposal = {
  title: string
  proposalCategory: ProposalCategory
  proposalCategoryOther?: string
  projectDescription?: string
  proposalDescription: string
  keywords: string[]
  trl: TRL
  goalTrl: TRL
  proposalType: ProposalType[]
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
