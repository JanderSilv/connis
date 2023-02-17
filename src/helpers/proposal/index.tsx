import { proposalAdditionalQuestions } from 'src/data/proposal'
import { ProposalType } from 'src/models/enums'
import { ProposalWasteQuestions } from 'src/models/types'

export const makeProposalTypeText = (proposalType: ProposalType[]) => {
  if (proposalType[0] === ProposalType.research) return null

  const baseText = 'A empresa está aberta a negociações envolvendo'
  const texts = {
    [ProposalType.buyOrSell]: 'valores',
    [ProposalType.exchange]: 'troca de bens',
    [ProposalType.donate]: 'doação',
    [ProposalType.research]: '',
  }

  if (proposalType.length === 1)
    return (
      <>
        {baseText} <strong>{texts[proposalType[0]]}</strong>.
      </>
    )

  const textsToUse = proposalType.map(type => texts[type])
  const lastText = textsToUse.pop()
  const text = textsToUse.join(', ')
  return (
    <>
      {baseText} <strong>{text}</strong> e <strong>{lastText}</strong>.
    </>
  )
}

export const makeWasteQuestionsData = (waste: ProposalWasteQuestions) => {
  const { production, testHasBeenPerformed, toxicity } = proposalAdditionalQuestions.waste

  return [
    {
      question: testHasBeenPerformed,
      answer: waste.testHasBeenPerformed ? 'Sim' : 'Não',
    },
    {
      question: toxicity,
      answer: waste.toxicity ? 'Sim' : 'Não',
    },
    {
      question: production,
      answer: `${waste.production.volume} ${waste.production.unit} ${waste.production.periodicity}`,
    },
  ]
}

export * from './company'
export * from './ict'
