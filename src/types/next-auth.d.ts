import NextAuth from 'next-auth'
import { BaseUser, User as AppUser, UserType } from 'src/models/types'

declare module 'next-auth' {
  interface Session {
    user: BaseUser | AppUser
  }
  interface User extends AppUser {
    type: UserType
    createdAt: string
    updatedAt?: string
  }
}
