import Link from 'next/link'
import { mutate } from 'swr'
import { Button, Stack } from '@mui/material'

import { ProposalStatus } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { useConfirmDialog, useLoadingBackdrop } from 'src/contexts'
import { useToast } from 'src/hooks'

import { ProposalStatusChip } from '../chip-status'
import { proposalService } from 'src/services'

type Props = {
  hasOffers: boolean
} & Proposal

export const AsideContentOwner = (props: Props) => {
  const { id, status, hasOffers } = props

  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { toggleLoading } = useLoadingBackdrop()
  const { showToast } = useToast()

  const changeProposalStatus = async (status: ProposalStatus) => {
    const shouldCancel = status === ProposalStatus.canceled
    const text = shouldCancel ? 'cancelada' : 'reaberta'

    try {
      toggleLoading()
      await proposalService.update(id, { status })
      await mutate(`${proposalService.baseUrl}/${id}`, {
        ...props,
        status,
      })
      showToast(`Proposta ${text} com sucesso`, 'success')
    } catch (error) {
      console.error(error)
      showToast(`Não foi possível ${text} a proposta`, 'error')
    } finally {
      toggleLoading()
    }
  }

  return (
    <>
      <ProposalStatusChip status={status} size="medium" sx={{ textAlign: 'center', display: 'flex' }} />
      <Stack mt={3} gap={1}>
        {status === ProposalStatus.opened && !hasOffers && (
          <Button variant="contained" fullWidth>
            Editar Proposta
          </Button>
        )}

        {status === ProposalStatus.onFormalization && (
          <Button component={Link} href={`/proposta/${id}/formalizacao`} variant="outlined" fullWidth>
            Ir para Formalização
          </Button>
        )}
        {status !== ProposalStatus.canceled && (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              handleOpenConfirmDialog({
                title: 'Cancelar Proposta',
                message:
                  'Deseja realmente cancelar a proposta? Você poderá reabri-la posteriormente e as ofertas serão mantidas.',
                confirmButton: {
                  onClick: () => changeProposalStatus(ProposalStatus.canceled),
                },
              })
            }
            fullWidth
          >
            Cancelar Proposta
          </Button>
        )}
        {status === ProposalStatus.canceled && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleOpenConfirmDialog({
                title: 'Reabrir Proposta',
                message: 'Deseja realmente reabrir a proposta?',
                confirmButton: {
                  onClick: () => changeProposalStatus(ProposalStatus.opened),
                },
              })
            }
            fullWidth
          >
            Reabrir Proposta
          </Button>
        )}
      </Stack>
    </>
  )
}
