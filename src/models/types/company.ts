import { CompanySize } from '../enums/company'

type CNAE = {
  id: string
  label: string
}

type CompanyAddress = {
  id: number
  city: string
  state: string
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
}
