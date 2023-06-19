import { useCallback, useEffect, useRef, useState } from 'react'
import { UseFormGetValues, UseFormReset } from 'react-hook-form'

import { StorageKeys } from 'src/models/enums'
import { SuggestionsKeys } from 'src/services/proposal-register/models'

import { formatString } from 'src/helpers/formatters'
import { toast } from 'src/helpers/shared'
import { proposalRegisterService } from 'src/services/proposal-register'
import { ProposalSchema } from 'src/validations/proposal-register'

import { useConfirmDialog, useLoadingBackdrop } from 'src/contexts'

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type Feedback = 'good' | 'bad'

type Feedbacks = PartialRecord<SuggestionsKeys, Feedback>

type Suggestions = {
  [K in SuggestionsKeys]?: K extends 'trl' | 'proposal' ? string : string[]
}

const USER_ID = Math.floor(100_000 + Math.random() * 900_000)
const INITIAL_SUGGESTIONS: Suggestions = {
  proposal: '',
  trl: '',
  keywords: [],
}

export const useProposalRegister = (
  getValues: UseFormGetValues<ProposalSchema>,
  reset: UseFormReset<ProposalSchema>
) => {
  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { toggleLoading, hideLoading } = useLoadingBackdrop()

  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS)
  const [feedbacks, setFeedbacks] = useState<Feedbacks>()

  const askedKeepProposalRef = useRef(false)

  useEffect(() => {
    const getStoredProposal = () => {
      const storedProposal = localStorage.getItem(StorageKeys.Proposal)
      if (storedProposal) {
        handleOpenConfirmDialog({
          title: 'Você possui uma proposta salva',
          message: 'Deseja continuar o cadastro de onde parou?',
          confirmButton: {
            children: 'Sim',
            onClick: () => reset(JSON.parse(storedProposal)),
          },
          cancelButton: {
            children: 'Não',
            onClick: () => {
              localStorage.removeItem(StorageKeys.Proposal)
            },
          },
          cannotCloseAtClickOutside: true,
        })
        askedKeepProposalRef.current = true
      }
    }

    if (!askedKeepProposalRef.current) getStoredProposal()
  }, [handleOpenConfirmDialog, reset])

  const getAllSuggestions = useCallback(
    async (shouldReset?: boolean) => {
      const splitKeywords = (suggestion?: string) =>
        suggestion
          ?.replaceAll('.', '')
          .split(',')
          .map(item => formatString.capitalizeFirstLetter(item.trim()))

      if (shouldReset) setSuggestions(INITIAL_SUGGESTIONS)

      try {
        toggleLoading({
          description: 'Aguarde alguns instantes. Uma IA está analisando sua proposta para sugerir melhorias.',
        })
        for await (const suggestion of proposalRegisterService.getAllSuggestionsGenerator({
          userId: USER_ID,
          description: getValues('description'),
          projectDescription: getValues('projectDescription'),
          types: getValues('types'),
        })) {
          if (suggestion.key === 'proposal') {
            setSuggestions(prevSuggestions => ({
              ...prevSuggestions,
              proposal: prevSuggestions.proposal + suggestion.data,
            }))
            hideLoading()
          }
          if (suggestion.key === 'trl')
            setSuggestions(prevSuggestions => ({ ...prevSuggestions, trl: suggestion.data }))
          if (suggestion.key === 'keywords')
            setSuggestions(prevSuggestions => ({ ...prevSuggestions, keywords: splitKeywords(suggestion.data) }))
          if (suggestion.key === 'sector') {
            try {
              const sector = JSON.parse(suggestion.data) as string[]
              if (sector) setSuggestions(prevSuggestions => ({ ...prevSuggestions, sector }))
            } catch (error) {
              console.error(error)
            }
          }
        }
      } catch (error) {
        console.error('useProposalRegister', { error })
        toast.show('Ocorreu um erro ao obter as sugestões. Prossiga o cadastro normalmente.', 'info')
        toggleLoading()
        throw error
      }
    },
    [getValues, hideLoading, toggleLoading]
  )

  const getCanGoNextStepCustomCheck = useCallback(
    async (currentStep: number) => {
      const customChecks = {
        5: async () => {
          if (!!suggestions.proposal) return true
          try {
            await getAllSuggestions()
            return false
          } catch (error) {
            return true
          }
        },
      }

      const customCheck = customChecks[currentStep as keyof typeof customChecks]
      if (!customCheck) return true
      return customChecks[currentStep as keyof typeof customChecks]()
    },
    [getAllSuggestions, suggestions?.proposal]
  )

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
    getCanGoNextStepCustomCheck,
    getAllSuggestions,
    handleSuggestionFeedback,
  }
}
