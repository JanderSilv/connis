import { proposalTypesTexts } from 'src/data/proposal'
import { ProposalType } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

type NegotiationData = {
  proposal: Proposal
  offer: Offer
  offers: Offer[]
}

const makeTRLText = (negotiation: NegotiationData, isTheOfferOwner: boolean) => {
  const { company, suggestion } = negotiation.offer

  const lastTRL = getLastValue('trl', negotiation)
  const lastGoalTRL = getLastValue('goalTrl', negotiation)

  const conditionals = {
    trl: !suggestion?.trl || lastTRL.value === suggestion?.trl,
    goalTRL: !suggestion?.goalTrl || lastGoalTRL.value === suggestion?.goalTrl,
  }
  let trlText: React.ReactNode = ''
  let goalTRLText: React.ReactNode = ''

  if (isTheOfferOwner) {
    if (conditionals.trl) {
      if (lastTRL.origin === 'proposal') trlText = 'Você manteve o nível de maturidade da proposta'
      else if (lastTRL.ownerId === company.id) trlText = 'Você manteve o nível de maturidade da sua oferta anterior'
      else trlText = 'Você concordou com o nível de maturidade escolhido pela empresa'
    } else {
      trlText = (
        <>
          Você identifica que a proposta se encaixa na <strong>TRL {suggestion?.trl}</strong>
        </>
      )
    }

    if (conditionals.goalTRL) {
      if (lastGoalTRL.origin === 'proposal')
        goalTRLText = 'manteve o nível de maturidade que almeja alcançar da proposta'
      else if (lastTRL.ownerId === company.id) goalTRLText = 'manteve o nível de maturidade da sua oferta anterior'
      else goalTRLText = 'concordou com o nível de maturidade que a empresa almeja alcançar'
    } else
      goalTRLText = (
        <>
          e pode auxiliar o projeto a atingir a <strong>TRL {suggestion?.goalTrl}</strong>
        </>
      )
  } else {
    if (conditionals.trl) {
      if (lastTRL.origin === 'proposal') trlText = 'A empresa manteve o nível de maturidade da proposta'
      if (lastTRL.ownerId === company.id) trlText = 'A empresa manteve o nível de maturidade da oferta anterior'
      else trlText = 'A empresa concorda com o nível de maturidade atual'
    } else
      trlText = (
        <>
          A empresa identifica que a proposta se encaixa na <strong>TRL {suggestion?.trl}</strong>
        </>
      )

    if (conditionals.goalTRL) {
      if (lastTRL.origin === 'proposal') goalTRLText = 'manteve o nível de maturidade que almeja alcançar da proposta'
      else if (lastTRL.ownerId === company.id)
        goalTRLText = 'manteve o nível de maturidade que almeja alcançar da sua oferta anterior'
      else goalTRLText = 'concorda com o nível de maturidade que almeja alcançar'
    } else
      goalTRLText = (
        <>
          e espera auxílio para atingir a <strong>TRL {suggestion?.goalTrl}</strong>
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

const makeProposalBudgetText = (negotiation: NegotiationData, isTheOfferOwner: boolean) => {
  const { offer: currentOffer } = negotiation
  const { value: lastBudget, origin, ownerId } = getLastValue('budget', negotiation)

  if (isTheOfferOwner) {
    if (lastBudget === currentOffer.suggestion?.budget) {
      if (origin === 'proposal') return 'Você manteve o valor original da proposta de'
      if (ownerId === currentOffer.company.id) return 'Você manteve o valor da sua última oferta de'
      return 'Você concordou com o valor definido pela empresa'
    }
    return `Você propôs um valor de`
  } else return `A empresa propôs um valor de`
}

type OfferProperty = keyof NonNullable<Offer['suggestion']>

const getLastValue = (property: OfferProperty, negotiation: NegotiationData) => {
  const { offer: currentOffer, offers, proposal } = negotiation
  const lastOffer = offers.filter(offer => offer.id !== currentOffer.id).find(offer => !!offer?.suggestion?.[property])
  if (lastOffer) return { value: lastOffer.suggestion?.[property], origin: 'offer', ownerId: lastOffer.company.id }
  return { value: proposal[property], origin: 'proposal', ownerId: proposal.company.id }
}

export { makeTRLText, makeMessageTitle, makeProposalTypeText, makeProposalBudgetText }
