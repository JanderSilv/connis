import { UserType } from '../enums'
import { Analyst } from './analyst'
import { Company } from './company'
import { ICT } from './ict'

export type User = {
  id: string
  name: string
  userName: string
  email: string
  image?: string | null
  phone: string
  type: UserType
  createdAt: string
}

export type CompanyUser = User & Company
export type ICTUser = User & ICT
export type AnalystUser = User & Analyst
