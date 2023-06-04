import { Offer, Proposal } from 'src/models/types'

type OfferProperty = keyof Offer['suggestion']

export const getLastValue = (property: OfferProperty, offers: Offer[], proposal: Proposal) => {
  const offer = offers.reverse().find(offer => !!offer.suggestion?.[property])
  if (offer) return offer.suggestion[property]
  return proposal[property]
}
