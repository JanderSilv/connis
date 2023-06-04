import { ChatCompletionRequestMessage } from 'openai'
import { toast } from 'src/helpers/shared'
import { suggestions } from './data'
import { getModeratedProposal, getSuggestionPrompt, sendMessages, sendMessagesStream } from './helpers'
import { ProposalInput, SuggestionsKeys } from './models'

async function* getAllSuggestionsGenerator(proposal: ProposalInput) {
  const { projectDescription, description, userId } = proposal

  const userInput = `${projectDescription ? `Descrição do projeto: ${projectDescription}` : ''}
  Descrição da proposta: ${description}`

  const proposalModeration = await getModeratedProposal(userInput)

  if (proposalModeration?.flagged) {
    toast.show(
      'Foram encontrados termos inapropriados na sua proposta. Por favor, revise e tente novamente.',
      'warning'
    )
    return
  }

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content:
        'Você é um consultor que auxilia empresas a escrever boas propostas de projetos, entende-se proposta como uma solução para um problema, oportunidade ou necessidade de uma empresa.',
    },
  ]

  for (const suggestion of Object.keys(suggestions)) {
    const suggestionPrompt = getSuggestionPrompt(suggestion as SuggestionsKeys, userInput)

    messages.push({ role: 'user', content: suggestionPrompt })

    if (suggestion === 'proposal') {
      for await (const message of sendMessagesStream({
        messages,
        userId,
      }))
        yield {
          key: suggestion as SuggestionsKeys,
          data: message,
          moderation: proposalModeration,
        }
    } else {
      const { data: response } = await sendMessages({
        messages,
        userId,
      })

      if (!response) break

      yield {
        key: suggestion as SuggestionsKeys,
        data: response,
        moderation: proposalModeration,
      }
    }
  }
}

export const proposalRegisterService = {
  getAllSuggestionsGenerator,
}
