import { UserType } from '../enums'
import { Analyst } from './analyst'
import { OldCompany } from './company'
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

export type OldUser = {
  id: string
  name: string
  email: string
  image?: string
  createdAt: string
  updatedAt?: string
} & (OldCompany | ICT | Analyst)

export type CompanyUser = OldUser & OldCompany
export type ICTUser = OldUser & ICT
export type AnalystUser = OldUser & Analyst
