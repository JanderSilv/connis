import { UserType } from '../enums'
import { Analyst } from './analyst'
import { Company } from './company'
import { ICT } from './ict'

export type BaseUser = {
  id: string
  name: string
  email: string
  image: string | null
  type: UserType
  emailVerified: Date | null
  createdAt: string
  updatedAt?: string
}

export type User = BaseUser & (Company | ICT | Analyst)

export type CompanyUser = User & Company
export type ICTUser = User & ICT
export type AnalystUser = User & Analyst
