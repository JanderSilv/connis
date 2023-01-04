import { AnalystUser } from './user'

export type ICTProject = {
  id: number
  title: string
  description: string
  image?: string
}

export type ICTLab = {
  id: number
  title: string
  description: string
  images?: string[]
}

export type ICTAddress = {
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
  email: string
  phone: string
  projects: ICTProject[]
  labs: ICTLab[]
  analysts: AnalystUser[]
  address: ICTAddress
}
