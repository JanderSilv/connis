import { Offer, Proposal } from 'src/models/types'

type OfferProperty = keyof NonNullable<Offer['suggestion']>

type NegotiationData = {
  proposal: Proposal
  offer?: Offer
  offers?: Offer[]
}

export const getLastValue = (property: OfferProperty, negotiation: NegotiationData) => {
  const { proposal, offers } = negotiation
  const lastOffer = offers?.find(offer => !!offer.suggestion?.[property])
  if (lastOffer) return lastOffer.suggestion?.[property]
  return proposal[property]
}
