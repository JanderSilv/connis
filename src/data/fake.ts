import {
  CompanySize,
  OfferCategory,
  OfferStatus,
  ProposalCategory,
  ProposalStatus,
  ProposalType,
  TRL,
} from 'src/models/enums'
import { Offer, OfferWithProposal, Proposal, User, ProposalWithOffers } from 'src/models/types'

const userCompany: User = {
  id: 1,
  name: 'Empresa do usuário',
  type: 'company',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  image: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: 1,
    city: 'Salvador',
    uf: 'BA',
    cep: '41820790',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.micro,
  socialCapital: 1_000_000,
  analysts: [],
}

const company: User = {
  id: 2,
  name: 'Empresa 1',
  type: 'company',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  image: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: 1,
    city: 'Salvador',
    uf: 'BA',
    cep: '41820790',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.micro,
  socialCapital: 1_000_000,
  analysts: [],
}

const offer: Offer = {
  id: 1,
  createdAt: new Date('2021').toLocaleString(),
  updatedAt: new Date().toLocaleString(),
  company,
  message: 'Podemos agregar ao seu projeto',
  type: ProposalType.buyOrSell,
  proposalId: 1,
  viewed: false,
  status: OfferStatus.sended,
  category: OfferCategory.default,
}

const proposal: Proposal = {
  id: 1,
  createdAt: new Date(2022, 10).toLocaleString(),
  company,
  keywords: ['Setor', 'Têxtil', 'Resíduos'],
  categoryQuestions: {
    waste: {
      production: {
        volume: '10',
        unit: 'Quilos (kg)',
        periodicity: 'Diariamente',
      },
    },
  },
  title: 'Título da Proposta',
  projectDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a dolor consequat, rutrum est ut, commodo magna. Morbi quis nisl quis risus ornare vestibulum quis non augue. Duis suscipit malesuada semper. In dolor urna, sodales eu ligula vulputate, convallis molestie nibh. Nam tempus, augue a finibus accumsan, felis quam accumsan neque, vitae pharetra diam lacus at tellus. Cras eleifend nibh neque, eu placerat mi finibus id. Curabitur sit amet nisi vel massa faucibus consequat. Sed rutrum quam in ultricies maximus. Mauris ut pellentesque dolor. Cras vestibulum, tortor et maximus euismod, sem velit dapibus dolor, eu gravida leo enim quis nisl. In vulputate leo in nisl condimentum, ultricies consectetur urna scelerisque. Proin ullamcorper arcu nec porta mollis. Fusce fermentum ullamcorper dictum. Fusce pretium tortor non luctus congue. Fusce non mattis enim. Praesent gravida ornare felis maximus dictum. ',
  proposalDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a dolor consequat, rutrum est ut, commodo magna. Morbi quis nisl quis risus ornare vestibulum quis non augue. Duis suscipit malesuada semper. In dolor urna, sodales eu ligula vulputate, convallis molestie nibh. Nam tempus, augue a finibus accumsan, felis quam accumsan neque, vitae pharetra diam lacus at tellus. Cras eleifend nibh neque, eu placerat mi finibus id. Curabitur sit amet nisi vel massa faucibus consequat. Sed rutrum quam in ultricies maximus. Mauris ut pellentesque dolor. Cras vestibulum, tortor et maximus euismod, sem velit dapibus dolor, eu gravida leo enim quis nisl. In vulputate leo in nisl condimentum, ultricies consectetur urna scelerisque. Proin ullamcorper arcu nec porta mollis. Fusce fermentum ullamcorper dictum. Fusce pretium tortor non luctus congue. Fusce non mattis enim. Praesent gravida ornare felis maximus dictum. ',
  proposalCategory: ProposalCategory.waste,
  proposalType: [ProposalType.buyOrSell],
  trl: TRL.trl1,
  goalTrl: TRL.trl3,
  budget: 100_000,
  status: ProposalStatus.opened,
  views: 10,
  viewed: false,
}

export const proposalWithOffers: ProposalWithOffers = {
  ...proposal,
  offers: {
    1: [offer],
    2: [{ ...offer, viewed: true }, offer],
  },
  currentOfferId: 1,
}

const myProposals: ProposalWithOffers[] = [
  { ...proposalWithOffers, status: ProposalStatus.opened },
  {
    ...proposalWithOffers,
    id: 2,
    status: ProposalStatus.canceled,
    proposalCategory: ProposalCategory.disruptiveInnovation,
    views: 10_000,
  },
]

const myOffers: OfferWithProposal[] = [
  { ...offer, proposal: proposal },
  { ...offer, id: 2, status: OfferStatus.rejected, viewed: true, type: ProposalType.donate, proposal: proposal },
]

export const fakeData = {
  userCompany,
  company,
  proposal,
  proposalWithOffers,
  myProposals,
  myOffers,
}
