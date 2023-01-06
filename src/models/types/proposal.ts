import { ProposalCategory, ProposalStatus, ProposalType, TRL } from '../enums'
import { Offer } from './offer'
import { CompanyUser } from './user'

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
  company: CompanyUser
  createdAt: string
  updatedAt?: string
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
  views: number
  viewed: boolean
}

export type ProposalWithOffers = {
  offers: Record<number, Offer[]>
  currentOfferId?: number
} & Proposal
