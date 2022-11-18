import { CompanySize, ProposalStatus, ProposalType } from 'src/models/enums'
import { Company, CounterProposal, Offer, Proposal } from 'src/models/types'

const userCompany: Company = {
  id: 1,
  name: 'Empresa do usuário',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  logo: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: 1,
    city: 'Salvador',
    state: 'BA',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.medium,
  socialCapital: 1_000_000,
}

const company: Company = {
  id: 1,
  name: 'Empresa 1',
  cnae: {
    id: '123456',
    label: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
  },
  logo: 'https://picsum.photos/200/200',
  cnpj: '12345678901234',
  address: {
    id: 1,
    city: 'Salvador',
    state: 'BA',
  },
  email: 'company@email.com.br',
  phone: '71999999999',
  size: CompanySize.medium,
  socialCapital: 1_000_000,
}

const proposal: Proposal = {
  id: 1,
  createdAt: new Date().toLocaleString(),
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
  title: 'Título',
  projectDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a dolor consequat, rutrum est ut, commodo magna. Morbi quis nisl quis risus ornare vestibulum quis non augue. Duis suscipit malesuada semper. In dolor urna, sodales eu ligula vulputate, convallis molestie nibh. Nam tempus, augue a finibus accumsan, felis quam accumsan neque, vitae pharetra diam lacus at tellus. Cras eleifend nibh neque, eu placerat mi finibus id. Curabitur sit amet nisi vel massa faucibus consequat. Sed rutrum quam in ultricies maximus. Mauris ut pellentesque dolor. Cras vestibulum, tortor et maximus euismod, sem velit dapibus dolor, eu gravida leo enim quis nisl. In vulputate leo in nisl condimentum, ultricies consectetur urna scelerisque. Proin ullamcorper arcu nec porta mollis. Fusce fermentum ullamcorper dictum. Fusce pretium tortor non luctus congue. Fusce non mattis enim. Praesent gravida ornare felis maximus dictum. ',
  proposalDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a dolor consequat, rutrum est ut, commodo magna. Morbi quis nisl quis risus ornare vestibulum quis non augue. Duis suscipit malesuada semper. In dolor urna, sodales eu ligula vulputate, convallis molestie nibh. Nam tempus, augue a finibus accumsan, felis quam accumsan neque, vitae pharetra diam lacus at tellus. Cras eleifend nibh neque, eu placerat mi finibus id. Curabitur sit amet nisi vel massa faucibus consequat. Sed rutrum quam in ultricies maximus. Mauris ut pellentesque dolor. Cras vestibulum, tortor et maximus euismod, sem velit dapibus dolor, eu gravida leo enim quis nisl. In vulputate leo in nisl condimentum, ultricies consectetur urna scelerisque. Proin ullamcorper arcu nec porta mollis. Fusce fermentum ullamcorper dictum. Fusce pretium tortor non luctus congue. Fusce non mattis enim. Praesent gravida ornare felis maximus dictum. ',
  proposalCategory: 0,
  proposalType: [0],
  trl: 1,
  goalTrl: 3,
  budget: 100_000,
  status: ProposalStatus.opened,
}

const offers: Offer[] = [
  {
    id: 1,
    createdAt: new Date().toLocaleString(),
    company,
    message: 'Podemos agregar ao seu projeto',
    proposalType: ProposalType.buyOrSell,
    budget: 100_000,
  },
]

const counterProposals: CounterProposal[] = [
  {
    id: 1,
    createdAt: new Date().toLocaleString(),
    company,
    message: 'Podemos agregar ao seu projeto, mas com essas condições',
    proposalType: ProposalType.buyOrSell,
    budget: 100_000,
  },
]

export const fakeData = {
  userCompany,
  company,
  proposal,
  offers,
  counterProposals,
}
