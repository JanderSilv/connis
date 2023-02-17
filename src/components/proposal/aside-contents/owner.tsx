import { Button, Stack } from '@mui/material'
import { ProposalStatus } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { ProposalStatusChip } from '../chip-status'

type Props = Proposal

export const AsideContentOwner = (props: Props) => {
  const { status } = props
  return (
    <>
      <ProposalStatusChip status={status} size="medium" sx={{ textAlign: 'center', display: 'flex' }} />

      <Stack mt={3} gap={1}>
        {status === ProposalStatus.opened && (
          <Button variant="contained" fullWidth>
            Editar Proposta
          </Button>
        )}

        <Button variant="contained" color="error" fullWidth>
          Cancelar Proposta
        </Button>
      </Stack>
    </>
  )
}
