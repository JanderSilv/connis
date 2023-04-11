import { UserType, CompanySize } from '../enums'
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
  type: UserType.company
  cnpj: string
  phone: string
  slug: string
  address: CompanyAddress
  cnae: CNAE | null
  socialCapital: number
  size: CompanySize
  analysts: AnalystUser[]
}
