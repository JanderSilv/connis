import { Address } from './address'
import { Image } from './common'
import { User } from './user'

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

export type ICT = {
  id: string
  name: string
  createdAt: string
  updatedAt?: string
  slug: string
  cnpj: string
  email: string
  image?: string
  phone: string
  website?: string
  projects: ICTProject[]
  laboratories: ICTLab[]
  analysts: User[]
  address: Address
}
