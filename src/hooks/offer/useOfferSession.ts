import { useSession } from 'next-auth/react'
import { Offer } from 'src/models/types'

export const useOfferSession = (offer: Offer) => {
  const { data: session, status } = useSession()

  const userIsTheOwnerOfOffer = session?.user.id === offer.company.id

  return {
    session,
    status,
    userIsTheOwnerOfOffer,
  }
}
