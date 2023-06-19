import { CompanySize, UserType } from 'src/models/enums'
import { User, Company, ICT } from 'src/models/types'
import { ictFakeData } from './ict'

const user: User = {
  id: '1',
  name: 'Usuário',
  type: UserType.ICTAdmin,
  createdAt: new Date(2022, 10).toLocaleString(),
  email: 'user@email.com.br',
  image: 'https://picsum.photos/200/200',
  userName: 'usuario',
  phone: '71999999999',
}

const analyst: User = {
  id: '5',
  name: 'Analista',
  type: UserType.CompanyAnalyst,
  createdAt: new Date(2022, 10).toLocaleString(),
  email: 'analista@email.com.br',
  image: 'https://picsum.photos/200/200',
  userName: 'analista',
  phone: '71999999999',
}

const userCompany: Company = {
  id: '1',
  name: 'Empresa do usuário',
  createdAt: new Date(2022, 10).toLocaleString(),
  slug: 'empresa-do-usuario',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  image: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: '1',
    city: 'Salvador',
    uf: 'BA',
    cep: '41820790',
    complement: 'Escritório',
    number: 1423,
    street: 'Rua da Bahia',
    country: 'Brasil',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.micro,
  socialCapital: 1_000_000,
  analystsIds: [analyst.id],
  adminId: user.id,
}

const company: Company = {
  id: '2',
  name: 'Empresa Ofertante',
  createdAt: new Date(2022, 10).toLocaleString(),
  slug: 'empresa-ofertante',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  image: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: '1',
    city: 'Salvador',
    uf: 'BA',
    cep: '41820790',
    complement: 'Escritório',
    number: 1423,
    street: 'Rua da Bahia',
    country: 'Brasil',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.micro,
  socialCapital: 1_000_000,
  analystsIds: [analyst.id],
  adminId: user.id,
}

const ict: ICT = {
  id: '2',
  name: 'Senai Cimatec',
  createdAt: new Date(2022, 10).toLocaleString(),
  slug: 'senai-cimatec',
  cnpj: '03795071001350',
  image: 'https://picsum.photos/200/200',
  laboratories: ictFakeData.labs,
  projects: [],
  address: {
    id: '1',
    city: 'Salvador',
    uf: 'BA',
    cep: '41820790',
    number: 1423,
    street: 'Rua da Bahia',
    complement: 'Casa',
    country: 'Brasil',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  website: 'https://www.senaicimatec.com.br/',
  analysts: [analyst],
}

export const userFakeData = {
  user,
  analyst,
  ict,
  userCompany,
  company,
}
