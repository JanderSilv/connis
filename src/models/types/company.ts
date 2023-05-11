import { CompanySize } from '../enums/company'
import { AnalystUser } from './user'

type CNAE = {
  id: string
  label: string
}

type CompanyAddress = {
  id: string
  city: string
  cep: string
  uf: string
  street: string
  number: number
  complement: string
  country: string
}

export type OldCompany = {
  type: 'company'
  cnpj: string
  phone: string
  slug: string
  address: CompanyAddress
  cnae: CNAE | null
  socialCapital: number
  size: CompanySize
  analysts: AnalystUser[]
}

export type Company = {
  id: string
  type: 'company'
  cnpj: string
  phone: string
  slug: string
  address: CompanyAddress
  cnaeId: string
  socialCapital: number
  size: CompanySize
  analystsIds: string[]
  adminId: string
}
