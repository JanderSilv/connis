import { ProposalStatus } from 'src/models/enums'

export const proposalStatus = {
  [ProposalStatus.opened]: {
    color: 'info.light',
    label: 'Aberto',
  },
  [ProposalStatus.onNegotiation]: {
    color: 'warning.light',
    label: 'Em negociação',
  },
  [ProposalStatus.onFormalization]: {
    color: 'success.light',
    label: 'Em formalização',
  },
  [ProposalStatus.canceled]: {
    color: 'error.light',
    label: 'Cancelado',
  },
  [ProposalStatus.finished]: {
    color: '#ba68c8',
    label: 'Finalizado',
  },
}
