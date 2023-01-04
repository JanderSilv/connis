import NextAuth, { DefaultUser } from 'next-auth'
import { User } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: User
  }
  interface User {
    id: number
  }
}
