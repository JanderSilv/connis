import { User } from '../user'

export type ChatMessage = {
  id: number
  user: User
  content: string
  createdAt: string
  updatedAt?: string
}
