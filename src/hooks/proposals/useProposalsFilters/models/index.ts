import { Organization } from 'src/models/types'
import { ProposalsParams } from 'src/services'

export type ProposalsConfig = {
  organization?: Organization
  fetchAllTypes?: boolean
  defaultParams?: ProposalsParams
}
