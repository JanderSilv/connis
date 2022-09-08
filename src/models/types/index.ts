import { ProposalCategory } from '../enums'

export type Proposal = {
  title: string
  proposalCategory: ProposalCategory
  proposalCategoryOther?: string
  projectDescription?: string
  proposalDescription: string
  keywords: string[]
  trl: number
  proposalType: number[]
  proposalCategoryQuestions: {
    waste?: {
      testHasBeenPerformed?: boolean
      toxicity?: boolean
      productionVolume?: string
    }
  }
}
