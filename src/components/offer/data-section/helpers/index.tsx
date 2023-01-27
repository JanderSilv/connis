import { proposalTypesTexts } from 'src/data/proposal'
import { ProposalType } from 'src/models/enums'
import { Offer } from 'src/models/types'

const makeTRLText = (offer: Offer, isTheOfferOwner: boolean) => {
  const { proposal, trl, goalTRL } = offer

  if (!proposal) return null

  const conditionals = {
    trl: !trl || proposal.trl === trl,
    goalTRL: !goalTRL || proposal.goalTrl === goalTRL,
  }

  let trlText: React.ReactNode = ''
  let goalTRLText: React.ReactNode = ''

  if (isTheOfferOwner) {
    if (conditionals.trl) trlText = 'Você concordou com o nível de maturidade escolhido pela empresa'
    else
      trlText = (
        <>
          Você identifica que a proposta se encaixa na <strong>TRL {trl}</strong>
        </>
      )

    if (conditionals.goalTRL) goalTRLText = 'concordou com o nível de maturidade que a empresa almeja alcançar'
    else
      goalTRLText = (
        <>
          e pode auxiliar o projeto a atingir a <strong>TRL {goalTRL}</strong>
        </>
      )
  } else {
    if (conditionals.trl) trlText = 'A empresa concorda com o nível de maturidade atual'
    else
      trlText = (
        <>
          A empresa identifica que a proposta se encaixa na <strong>TRL {trl}</strong>
        </>
      )

    if (conditionals.goalTRL) goalTRLText = 'concorda com o nível de maturidade que você almeja alcançar'
    else
      goalTRLText = (
        <>
          e espera auxílio para atingir a <strong>TRL {goalTRL}</strong>
        </>
      )
  }

  return (
    <>
      {trlText} e {goalTRLText}
    </>
  )
}

const makeMessageTitle = (status: string, isTheOfferOwner: boolean) => {
  if (status === 'loading') return 'Mensagem'
  return isTheOfferOwner ? 'Sua mensagem' : 'Mensagem da Empresa'
}

const makeProposalTypeText = (proposalType: ProposalType, isTheOfferOwner: boolean) =>
  isTheOfferOwner
    ? `Você deseja seguir a negociação envolvendo ${proposalTypesTexts[proposalType]}`
    : `A empresa deseja seguir a negociação envolvendo ${proposalTypesTexts[proposalType]}`

const makeProposalBudgetText = (currentOffer: Offer, offersHistory: Offer[], isTheOfferOwner: boolean) => {
  const previousOffer = offersHistory.at(-2)
  if (isTheOfferOwner) {
    if (previousOffer) {
      if (previousOffer.budget === currentOffer.budget) return 'Você concordou com o orçamento definido pela empresa'
      else return `Você solicitou um orçamento de`
    } else {
      if (currentOffer.proposal?.budget === currentOffer.budget)
        return 'Você concordou com o orçamento definido pela empresa'
      else return `Você solicitou um orçamento de`
    }
  } else {
    if (previousOffer) {
      if (previousOffer.budget === currentOffer.budget) return 'A empresa concorda com o orçamento definido'
      else return `A empresa propôs um orçamento de`
    }
  }
}

export { makeTRLText, makeMessageTitle, makeProposalTypeText, makeProposalBudgetText }
