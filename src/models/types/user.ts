import { Company } from './company'
import { ICT } from './ict'

export type CompanyUser = {
  type: 'company'
} & Company
export type ICTUser = {
  type: 'ict'
} & ICT
export type AnalystUser = {
  type: 'analyst'
}

export type User = {
  id: number
  name: string
  email: string
  logo?: string
} & (CompanyUser | ICTUser | AnalystUser)
