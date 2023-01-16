import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

import { pages } from 'src/constants'
import { fakeData } from 'src/data/fake'

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
        // TODO: remove this fake data, and use real data from database
        console.log({ credentials })
        const user = fakeData.userCompany

        if (user) return user
        else return null
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: pages.login,
    newUser: pages.companySocialSignUp,
  },
  callbacks: {
    session: async ({ session }) => {
      // TODO: remove this fake data, and use real data from database
      const { user } = session as DefaultSession
      return {
        ...session,
        user: {
          ...fakeData.company,
          type: 'company',
          image: fakeData.company.image || (user?.image ? user.image : ''),
          email: fakeData.company.email || (user?.email ? user.email : ''),
          // cnpj: '',
        },
      }
    },
  },
}

export default NextAuth(authOptions)
