import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Offer } from 'src/models/types'

export const useOfferSession = (offer?: Offer, serverSession?: Session) => {
  const { data: session, status } = useSession()

  if (serverSession)
    return {
      session: serverSession,
      status: 'authenticated',
      userIsTheOfferOwner: serverSession?.user.id === offer?.user.id,
    }

  return {
    session,
    status,
    userIsTheOfferOwner: session?.user.id === offer?.user.id,
  }
}
