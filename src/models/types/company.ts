import { CompanySize } from '../enums/company'
import { AnalystUser } from './user'

type CNAE = {
  id: string
  label: string
}

type CompanyAddress = {
  id: number
  city: string
  cep: string
  uf: string
}

export type Company = {
  id: number
  name: string
  cnpj: string
  email: string
  phone: string
  address: CompanyAddress
  logo?: string
  cnae: CNAE | null
  socialCapital: number
  size: CompanySize
  analysts: AnalystUser[]
}
