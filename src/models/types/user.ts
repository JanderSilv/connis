import { UserType } from '../enums'

export type User = {
  id: string
  name: string
  userName: string
  email: string
  image?: string | null
  phone: string
  type: UserType
  createdAt: string
  companyId?: string
  ictId?: string
}
