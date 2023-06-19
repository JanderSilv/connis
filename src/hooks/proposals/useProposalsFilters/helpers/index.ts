import { ProposalsConfig } from '../models'
import { ProposalType } from 'src/models/enums'

import { ProposalsParams } from 'src/services'

export const getProposalTypes = (params?: ProposalsParams, config?: ProposalsConfig) => {
  if (params?.type?.length) return params.type
  if (config?.fetchAllTypes) return []
  return config?.organization === 'ict'
    ? [ProposalType.research]
    : [ProposalType.buyOrSell, ProposalType.donate, ProposalType.exchange]
}
