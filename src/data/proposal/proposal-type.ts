import { ProposalType } from 'src/models/enums'
import { CardData } from 'src/components/proposal-register/cards-select'
import { AttachMoneyIcon, BiotechIcon, SyncIcon, VolunteerActivismIcon } from 'src/assets/icons'

export const proposalTypes = {
  [ProposalType.buyOrSell]: {
    id: ProposalType.buyOrSell,
    icon: AttachMoneyIcon,
    title: 'Compra/Venda',
    description: 'Está aberto a negociar envolvendo valores monetários',
  },
  [ProposalType.donate]: {
    id: ProposalType.donate,
    icon: VolunteerActivismIcon,
    title: 'Doação',
    description: 'Está aberto a negociar sem o envolvimento de valores monetários',
  },
  [ProposalType.exchange]: {
    id: ProposalType.exchange,
    icon: SyncIcon,
    title: 'Troca',
    description: 'Está aberto a negociar envolvendo troca de bens',
  },
  [ProposalType.research]: {
    id: ProposalType.research,
    icon: BiotechIcon,
    title: 'P&D',
    description: 'Deseja realizar o processo de Pesquisa e Desenvolvimento através do ICT Cimatec.',
    solo: true,
  },
}

export const proposalTypeOptions: CardData[] = [
  proposalTypes[ProposalType.buyOrSell],
  proposalTypes[ProposalType.donate],
  proposalTypes[ProposalType.exchange],
  proposalTypes[ProposalType.research],
]

const proposalTypesTexts = {
  [ProposalType.buyOrSell]: 'valores',
  [ProposalType.exchange]: 'troca de bens',
  [ProposalType.donate]: 'doação',
  [ProposalType.research]: 'pesquisa e desenvolvimento',
}

export { proposalTypesTexts }
