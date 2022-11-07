import { Chip } from '@mui/material'
import { proposalStatus } from 'src/data/proposal'
import { ProposalStatus } from 'src/models/enums'

type ProposalStatusChipProps = {
  status: ProposalStatus
}

export const ProposalStatusChip = ({ status }: ProposalStatusChipProps) => (
  <Chip
    label={proposalStatus[status].label}
    size="small"
    sx={{
      color: 'primary.contrastText',
      backgroundColor: proposalStatus[status].color,
    }}
  />
)
