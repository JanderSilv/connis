import { ChatCompletionRequestMessage } from 'openai'

export type ChatCompletionBody = {
  messages: ChatCompletionRequestMessage[]
  userId: string
}
