import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { api } from 'src/services'

export const useAuth = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const setupTokenAtApiHeaders = async () => {
      if (session?.accessToken) api.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`
      else delete api.defaults.headers.common.Authorization
    }

    const checkIfSessionIsExpired = () => {
      if (session?.errorStatus === 401) signOut()
    }

    setupTokenAtApiHeaders()
    checkIfSessionIsExpired()
  }, [session?.accessToken, session?.errorStatus])

  return session
}
