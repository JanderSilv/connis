import { OldUser } from '../user'

export type ChatMessage = {
  id: string
  user: OldUser
  content: string
  createdAt: string
  updatedAt?: string
}
