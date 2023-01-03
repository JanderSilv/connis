import NextAuth from 'next-auth'
import { User } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
