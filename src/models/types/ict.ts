import { Image } from './common'
import { AnalystUser } from './user'

export type ICTProject = {
  id: string
  title: string
  description: string
  image?: Image
}

export type ICTLab = {
  id: string
  title: string
  description: string
  images?: Image[]
}

export type ICTAddress = {
  id: string
  city: string
  uf: string
  cep: string
  street: string
  number: string
  complement?: string
}

export type ICT = {
  type: 'ict'
  name: string
  slug: string
  cnpj: string
  email: string
  phone: string
  website?: string
  projects: ICTProject[]
  labs: ICTLab[]
  analysts: AnalystUser[]
  address: ICTAddress
}
