import { ProposalType } from 'src/models/enums'

export type ProposalInput = {
  projectDescription?: string
  description: string
  userId: number
  types: ProposalType[]
}

const suggestionKeys = ['proposal', 'trl', 'keywords', 'sector'] as const

export type SuggestionsKeys = (typeof suggestionKeys)[number]
