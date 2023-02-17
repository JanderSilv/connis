import { Box } from '@mui/material'
import { Proposal } from 'src/models/types'
import { ProposalDataSectionOne } from './one'
import { ProposalDataSectionThree } from './three'
import { ProposalDataSectionTwo } from './two'

type ProposalSectionsProps = {
  proposal: Proposal
}

export const ProposalSections = ({ proposal }: ProposalSectionsProps) => (
  <Box component="main">
    <ProposalDataSectionOne {...proposal} />
    <ProposalDataSectionTwo {...proposal} />
    <ProposalDataSectionThree {...proposal} />
  </Box>
)
