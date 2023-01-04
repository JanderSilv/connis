import NextAuth, { DefaultUser } from 'next-auth'
import { User as AppUser } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: AppUser
  }
  interface User {
    id: number
  }
}
