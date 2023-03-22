import { ChatCompletionRequestMessage } from 'openai'
import { toast } from 'src/helpers/toast'
import { suggestions } from './data'
import { getModeratedProposal, getSuggestionPrompt, sendMessages } from './helpers'
import { ProposalInput, SuggestionsKeys } from './models'

async function* getAllSuggestionsGenerator(proposal: ProposalInput) {
  const { projectDescription, description, userId } = proposal

  const userInput = `
    ${projectDescription ? `Descrição do projeto: "${projectDescription}"` : ''}
    Descrição da proposta: "${description}"
  `

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
      content: 'Você é um consultor que auxilia empresas a escrever bons pedidos de ajuda para problemas em projetos',
    },
  ]

  for (const suggestion of Object.keys(suggestions)) {
    const suggestionPrompt = getSuggestionPrompt(suggestion as SuggestionsKeys, userInput)

    messages.push({ role: 'user', content: suggestionPrompt })

    const suggestionResponse = await sendMessages({
      messages,
      userId,
    })

    if (!suggestionResponse?.data) break

    yield {
      key: suggestion as SuggestionsKeys,
      data: suggestionResponse.data,
      moderation: proposalModeration,
    }
  }
}

export const proposalRegisterService = {
  getAllSuggestionsGenerator,
}
