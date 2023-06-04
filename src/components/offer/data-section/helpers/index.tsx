import { proposalTypesTexts } from 'src/data/proposal'
import { ProposalType } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

type NegotiationData = {
  proposal: Proposal
  offer: Offer
  offers: Offer[]
}

const makeTRLText = (data: NegotiationData, isTheOfferOwner: boolean) => {
  const { offer, offers, proposal } = data
  const { goalTrl, trl } = offer.suggestion

  if (!proposal) return null

  const conditionals = {
    trl: !trl || getLastValue('trl', offers, proposal) === trl,
    goalTRL: !goalTrl || getLastValue('goalTrl', offers, proposal) === goalTrl,
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
          e pode auxiliar o projeto a atingir a <strong>TRL {goalTrl}</strong>
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
          e espera auxílio para atingir a <strong>TRL {goalTrl}</strong>
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

const makeProposalBudgetText = (
  proposal: Proposal,
  currentOffer: Offer,
  offersHistory: Offer[],
  isTheOfferOwner: boolean
) => {
  const previousOffer = offersHistory.at(-2)

  if (isTheOfferOwner) {
    if (previousOffer) {
      if (previousOffer?.suggestion.budget === currentOffer.suggestion.budget)
        return 'Você concordou com o valor definido pela empresa'
      else return `Você solicitou um valor de`
    } else {
      if (proposal.budget === currentOffer.suggestion.budget) return 'Você concordou com o valor definido pela empresa'
      else return `Você solicitou um valor de`
    }
  } else {
    if (previousOffer) {
      if (previousOffer?.suggestion.budget === currentOffer.suggestion.budget)
        return 'A empresa concorda com o valor definido'
      else return `A empresa propôs um valor de`
    }
  }
}

type OfferProperty = keyof Offer['suggestion']

const getLastValue = (property: OfferProperty, offers: Offer[], proposal: Proposal) => {
  const offer = offers.reverse().find(offer => !!offer.suggestion[property])
  if (offer) return offer.suggestion[property]
  return proposal[property]
}

export { makeTRLText, makeMessageTitle, makeProposalTypeText, makeProposalBudgetText }
