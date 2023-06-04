import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

import { HttpResponseError } from 'src/models/types'

import { pages } from 'src/constants'
import { authStorage } from 'src/helpers/auth'
import { api, userService } from 'src/services'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          if (!credentials) return null
          const { data: loginResponse } = await userService.login(credentials.email, credentials.password)
          api.defaults.headers.common.Authorization = `Bearer ${loginResponse.jwtToken}`
          authStorage.storeToken(loginResponse.jwtToken)
          const { data: user } = await userService.getCurrent()

          if (user)
            return {
              ...user,
              accessToken: loginResponse.jwtToken,
            }
          else return null
        } catch (err) {
          const error = err as HttpResponseError
          throw new Error(
            JSON.stringify({
              message: error.response?.data?.message || 'Credenciais Inválidas',
              status: error.response?.status || 404,
            })
          )
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
  },
  pages: {
    signIn: pages.login,
    newUser: pages.signUp,
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (trigger === 'update') {
        const { data } = await userService.getCurrent()
        token.user = {
          ...data,
          name: data.name as string,
          email: data.email as string,
        }
      }

      if (!user) return token

      token.user = {
        ...user,
        name: user.name as string,
        email: user.email as string,
      }
      token.accessToken = user.accessToken
      return token
    },
    session: async ({ token, session }) => {
      const { user, accessToken } = token

      delete (user as any)['accessToken']

      if (user?.id && accessToken) {
        session.user = user
        session.accessToken = accessToken
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        return session
      }

      const storedToken = authStorage.getToken() || ''
      try {
        const { data } = await userService.getCurrent()
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`
        session.user = data
      } catch (error) {
        session.errorStatus = (error as any).response?.status
      }

      session.accessToken = storedToken
      return session
    },
  },
}

export default NextAuth(authOptions)
