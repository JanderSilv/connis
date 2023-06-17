import { CompanySize } from '../enums/company'
import { Address } from './address'

export type CNAE = {
  id: string
  label: string
}

export type Company = {
  id: string
  name: string
  createdAt: string
  updatedAt?: string
  email: string
  cnpj: string
  image?: string | null
  phone: string
  slug: string
  address: Address
  cnae: CNAE
  socialCapital: number
  size: CompanySize
  analystsIds: string[]
  adminId: string
}
