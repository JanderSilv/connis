import { User } from '../user'

export type ChatMessage = {
  id: string
  user: User
  content: string
  createdAt: string
  updatedAt?: string
}
