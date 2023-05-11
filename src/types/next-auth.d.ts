import NextAuth, { DefaultUser } from 'next-auth'
import { OldUser as AppUser } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: AppUser
  }
  interface User {
    id: AppUser['id']
  }
}
