import { User } from 'src/models/types'

export type ProposalInput = {
  projectDescription?: string
  description: string
  userId: User['id']
}

export type SuggestionsKeys = 'proposal' | 'trl' | 'keywords'
