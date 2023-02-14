import { ICTOfferStatus } from 'src/models/enums'
import { ChatMessage, ICTOffer } from 'src/models/types'
import { userFakeData } from './user'

const { company, userCompany, ict } = userFakeData

const messages: ChatMessage[] = [
  {
    id: 1,
    user: userCompany,
    content: 'Olá',
    createdAt: new Date(2023, 0).toLocaleString(),
  },
  {
    id: 2,
    user: userCompany,
    content: 'Como vai?',
    createdAt: new Date(2023, 0).toLocaleString(),
  },
  {
    id: 3,
    user: company,
    content: 'Olá, tudo sim e com você?',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 4,
    user: company,
    content: 'Estou interessado em sua proposta',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 5,
    user: company,
    content: 'Me liga no número (71) 99999-9999',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 6,
    user: userCompany,
    content: 'Prefiro continuar a negociação por aqui',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 7,
    user: userCompany,
    content: 'Se não for um problema para você',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 8,
    user: company,
    content: 'Problema algum.',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 9,
    user: company,
    content:
      'Eu necessito de um sistema de gestão de estoque para minha empresa, atualmente somos 40 funcionários e temos um estoque de 1000 produtos. Você tem algum sistema pronto?',
    createdAt: new Date().toLocaleString(),
  },
]

const ictOffer: ICTOffer = {
  id: 1,
  proposalId: 1,
  title: 'Proposta de desenvolvimento de sistema de gestão de estoque',
  description:
    'Temos uma solução pronta para sua empresa e uma equipe de desenvolvimento para atender suas necessidades.',
  createdAt: new Date(2023, 0).toLocaleString(),
  ict,
  suggestedFundingAgencies: ['SEBRAE', 'EMBRAPII'],
  status: ICTOfferStatus.sended,
}

export const negotiationFakeData = {
  messages,
  ictOffer,
}
