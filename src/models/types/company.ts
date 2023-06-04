import { CompanySize } from '../enums/company'

export type CNAE = {
  id: string
  label: string
}

export type CompanyAddress = {
  id: string
  city: string
  cep: string
  uf: string
  street: string
  number: number
  complement: string
  country: string
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
  address: CompanyAddress
  cnae: CNAE
  socialCapital: number
  size: CompanySize
  analystsIds: string[]
  adminId: string
}
