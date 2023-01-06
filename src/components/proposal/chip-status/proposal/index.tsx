import { Chip, ChipProps } from '@mui/material'
import { proposalStatus } from 'src/data/proposal'
import { ProposalStatus } from 'src/models/enums'

type ProposalStatusChipProps = {
  status: ProposalStatus
} & ChipProps

export const ProposalStatusChip = ({ status, sx, ...rest }: ProposalStatusChipProps) => (
  <Chip
    label={proposalStatus[status].label}
    size="small"
    sx={{
      color: 'primary.contrastText',
      backgroundColor: proposalStatus[status].color,
      ...sx,
    }}
    {...rest}
  />
)
