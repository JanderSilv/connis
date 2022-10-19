import { ProposalType } from 'src/models/enums'
import { CardData } from 'src/components/proposal-register/cards-select'
import { AttachMoneyIcon, BiotechIcon, SyncIcon, VolunteerActivismIcon } from 'src/assets/icons'

export const proposalTypeOptions: CardData[] = [
  {
    id: ProposalType.buyOrSell,
    icon: AttachMoneyIcon,
    title: 'Compra/Venda',
    description: 'Está aberto a negociar envolvendo valores monetários',
  },
  {
    id: ProposalType.donate,
    icon: VolunteerActivismIcon,
    title: 'Doação',
    description: 'Está aberto a negociar sem o envolvimento de valores monetários',
  },
  {
    id: ProposalType.exchange,
    icon: SyncIcon,
    title: 'Troca',
    description: 'Está aberto a negociar envolvendo troca de bens',
  },
  {
    id: ProposalType.research,
    icon: BiotechIcon,
    title: 'P&D',
    description: 'Deseja realizar o processo de Pesquisa e Desenvolvimento através do ICT Cimatec.',
    solo: true,
  },
]