import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Offer } from 'src/models/types'

export const useOfferSession = (offer?: Offer, serverSession?: Session) => {
  const { data: session, status } = useSession()

  if (serverSession)
    return {
      session: serverSession,
      userIsTheOwnerOfOffer: serverSession?.user.id === offer?.company.id,
    }

  return {
    session,
    status,
    userIsTheOwnerOfOffer: session?.user.id === offer?.company.id,
  }
}
