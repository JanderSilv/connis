import { useCallback, useState } from 'react'
import { UseFormGetValues } from 'react-hook-form'

import { useLoadingBackdrop } from 'src/contexts/loading-backdrop'
import { formatString } from 'src/helpers/formatters'
import { toast } from 'src/helpers/toast'
import { proposalRegisterService } from 'src/services/proposal-register'
import { SuggestionsKeys } from 'src/services/proposal-register/models'
import { ProposalSchema } from 'src/validations/proposal-register'

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type Feedback = 'good' | 'bad'

type Feedbacks = PartialRecord<SuggestionsKeys, Feedback>

type Suggestions = {
  [K in SuggestionsKeys]?: K extends 'trl' ? string : string[]
}

export const useProposalRegister = (
  currentStep: number,
  userId: number,
  getValues: UseFormGetValues<ProposalSchema>
) => {
  const [suggestions, setSuggestions] = useState<Suggestions>({
    proposal: [],
    trl: '',
    keywords: [],
  })

  const [feedbacks, setFeedbacks] = useState<Feedbacks>()

  const { toggleLoading } = useLoadingBackdrop()

  const getAllSuggestions = useCallback(async () => {
    const splitProposal = (suggestion?: string) =>
      suggestion
        ?.split('\n')
        .filter(item => item !== '')
        .map(item => {
          const itemTrimmed = item.trim()
          if (itemTrimmed.startsWith('- ')) return itemTrimmed.slice(2)
          return itemTrimmed
        })
    const splitKeywords = (suggestion?: string) =>
      suggestion
        ?.replaceAll('.', '')
        .split(',')
        .map(item => formatString.capitalizeFirstLetter(item.trim()))

    try {
      toggleLoading({
        description: 'Aguarde alguns instantes. Uma IA está analisando sua proposta para sugerir melhorias.',
      })
      for await (const suggestion of proposalRegisterService.getAllSuggestionsGenerator({
        userId,
        description: getValues('proposalDescription'),
        projectDescription: getValues('projectDescription'),
      })) {
        if (suggestion.key === 'proposal') {
          setSuggestions(prevSuggestions => ({ ...prevSuggestions, proposal: splitProposal(suggestion.data) }))
          toggleLoading()
        }
        if (suggestion.key === 'trl') setSuggestions(prevSuggestions => ({ ...prevSuggestions, trl: suggestion.data }))
        if (suggestion.key === 'keywords')
          setSuggestions(prevSuggestions => ({ ...prevSuggestions, keywords: splitKeywords(suggestion.data) }))
      }
    } catch (error) {
      console.error('useProposalRegister', { error })
      toast.show('Ocorreu um erro ao tentar obter as sugestões. Prossiga o cadastro normalmente.', 'warning')
      toggleLoading()
      throw error
    }
  }, [getValues, toggleLoading, userId])

  const getCustomCheck = useCallback(() => {
    switch (currentStep) {
      case 4:
        return async () => {
          if (!!suggestions?.proposal?.length) return true
          try {
            await getAllSuggestions()
            return true
          } catch (error) {
            return true
          }
        }
    }
  }, [currentStep, getAllSuggestions, suggestions?.proposal?.length])

  const handleSuggestionFeedback = useCallback((suggestion: SuggestionsKeys, feedback: Feedback) => {
    // TODO: send feedback to backend
    if (feedback === 'good') {
      console.log(`good ${suggestion}`)
      setFeedbacks(prevFeedbacks => ({ ...prevFeedbacks, [suggestion]: feedback }))
    } else {
      console.log(`bad ${suggestion}`)
      setFeedbacks(prevFeedbacks => ({ ...prevFeedbacks, [suggestion]: feedback }))
    }
  }, [])

  return {
    suggestions,
    feedbacks,
    getCustomCheck,
    getAllSuggestions,
    handleSuggestionFeedback,
  }
}
