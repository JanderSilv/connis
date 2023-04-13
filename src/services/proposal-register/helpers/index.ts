import { ChatCompletionRequestMessage, CreateModerationResponseResultsInner } from 'openai'

import { User } from 'src/models/types'
import { SuggestionsKeys } from '../models'

import { api } from '../api'
import { suggestions } from '../data'

export const getModeratedProposal = async (input: string) => {
  try {
    const { data } = await api.post<CreateModerationResponseResultsInner>('/moderate', { input })

    return data
  } catch (error) {
    console.error({ error })
  }
}

type SendMessagesBody = {
  messages: ChatCompletionRequestMessage[]
  userId: User['id']
}

export const sendMessages = async (body: SendMessagesBody) => {
  try {
    const response = await api.post<string | undefined>('/chat-completion', body)
    return response
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const getSuggestionPrompt = (suggestion: SuggestionsKeys, input: string) =>
  `${suggestions[suggestion]}\n${input}`
