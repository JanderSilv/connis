import { ChatCompletionRequestMessage, CreateModerationResponseResultsInner } from 'openai'

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
  userId: number
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

export async function* sendMessagesStream(body: SendMessagesBody) {
  const response = await fetch('/api/open-ai/chat-completion/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = response.body

  if (!data) return

  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    console.log('chunkValue', chunkValue)
    yield chunkValue
  }
}

export const getSuggestionPrompt = (suggestion: SuggestionsKeys, input: string) => {
  if (suggestion === 'proposal') return `${suggestions.proposal}\n${input}`
  return suggestions[suggestion]
}
