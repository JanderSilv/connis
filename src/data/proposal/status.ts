import { ProposalStatus } from 'src/models/enums'

export const proposalStatus = {
  [ProposalStatus.opened]: {
    color: 'success.light',
    label: 'Aberto',
  },
  [ProposalStatus.canceled]: {
    color: 'error.light',
    label: 'Cancelado',
  },
  [ProposalStatus.onNegotiation]: {
    color: 'warning.light',
    label: 'Em negociação',
  },
  [ProposalStatus.finished]: {
    color: '#ba68c8',
    label: 'Finalizado',
  },
}
