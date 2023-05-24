import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { pages } from 'src/constants'
import { fakeData } from 'src/data/fake'
import { ssg } from 'src/helpers/ssg'
import { UserType } from 'src/models/enums'
import { userCaller } from 'src/server/api/callers'
import { prisma } from 'src/services/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile: profile => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        type: profile.type ?? 'company',
        createdAt: profile.createdAt,
      }),
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
      profile: async (profile, tokens) => {
        const profilePhotoSize = 48
        const profilePicture = await fetch(
          `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        )
        const profileData = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          type: profile.type ?? 'company',
          createdAt: profile.createdAt,
        }

        if (profilePicture.ok) {
          const pictureBuffer = await profilePicture.arrayBuffer()
          const pictureBase64 = Buffer.from(pictureBuffer).toString('base64')
          return {
            ...profileData,
            image: `data:image/jpeg;base64, ${pictureBase64}`,
          }
        } else {
          return profileData
        }
      },
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
    session: async ({ session, user }) => {
      const databaseUser = await ssg(session).user.get.fetch({
        id: user.id,
        type: user.type,
      })

      if (databaseUser) session.user = databaseUser
      else if (!!session.user && 'createdAt' in user)
        session.user = {
          ...user,
          ...session.user,
          createdAt: new Date(user.createdAt).toISOString(),
          updatedAt: new Date(user.updatedAt || '').toISOString(),
          emailVerified: session.user.emailVerified || null,
        }

      return session
    },
  },
}

export default NextAuth(authOptions)
