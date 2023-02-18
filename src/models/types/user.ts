import { Analyst } from './analyst'
import { Company } from './company'
import { ICT } from './ict'

export type User = {
  id: number
  name: string
  email: string
  image?: string
  createdAt: string
  updatedAt?: string
} & (Company | ICT | Analyst)

export type CompanyUser = User & Company
export type ICTUser = User & ICT
export type AnalystUser = User & Analyst
