import { ICTOfferStatus } from 'src/models/enums'
import { ChatMessage, ICTOffer } from 'src/models/types'
import { userFakeData } from './user'

const { user, ict } = userFakeData

const otherUser = {
  ...user,
  id: '2',
}

const messages: ChatMessage[] = [
  {
    id: '1',
    user,
    content: 'Olá',
    createdAt: new Date(2023, 0).toLocaleString(),
  },
  {
    id: '2',
    user,
    content: 'Como vai?',
    createdAt: new Date(2023, 0).toLocaleString(),
  },
  {
    id: '3',
    user: otherUser,
    content: 'Olá, tudo sim e com você?',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '4',
    user: otherUser,
    content: 'Estou interessado em sua proposta',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '5',
    user: otherUser,
    content: 'Me liga no número (71) 99999-9999',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '6',
    user,
    content: 'Prefiro continuar a negociação por aqui',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '7',
    user,
    content: 'Se não for um problema para você',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '8',
    user: otherUser,
    content: 'Problema algum.',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '9',
    user: otherUser,
    content:
      'Eu necessito de um sistema de gestão de estoque para minha empresa, atualmente somos 40 funcionários e temos um estoque de 1000 produtos. Você tem algum sistema pronto?',
    createdAt: new Date().toLocaleString(),
  },
]

const ictOffer: ICTOffer = {
  id: '1',
  userProponent: user,
  description:
    'Temos uma solução pronta para sua empresa e uma equipe de desenvolvimento para atender suas necessidades.',
  createdAt: new Date(2023, 0).toLocaleString(),
  ict,
  fundingAgencies: ['SEBRAE', 'EMBRAPII'],
  status: ICTOfferStatus.sended,
}

export const negotiationFakeData = {
  messages,
  ictOffer,
}
