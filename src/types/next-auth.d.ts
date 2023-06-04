import NextAuth, { DefaultUser } from 'next-auth'
import { User as AppUser } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: AppUser
    accessToken: string
    errorStatus?: number
  }
  interface User extends AppUser {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: AppUser
    accessToken?: string
  }
}
