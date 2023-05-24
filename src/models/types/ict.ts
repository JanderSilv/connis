import { UserType } from '../enums'
import { Image } from './common'
import { AnalystUser } from './user'

export type ICTProject = {
  id: number
  title: string
  description: string
  image?: Image
}

export type ICTLab = {
  id: number
  title: string
  description: string
  images?: Image[]
}

export type ICTAddress = {
  id: number
  city: string
  uf: string
  cep: string
  street: string
  number: string
  complement?: string
}

export type ICT = {
  type: UserType.ict
  slug: string
  cnpj: string
  phone: string
  website?: string
  projects: ICTProject[]
  labs: ICTLab[]
  analysts: AnalystUser[]
  address: ICTAddress
}
