import { BaseUser } from '../user'

export type ChatMessage = {
  id: number
  user: BaseUser
  content: string
  createdAt: string
  updatedAt?: string
}
