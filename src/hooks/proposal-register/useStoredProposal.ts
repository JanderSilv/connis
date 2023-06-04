import { useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useConfirmDialog } from 'src/contexts'

import { StorageKeys } from 'src/models/enums'
import { ProposalSchema } from 'src/validations/proposal-register'

export const useStoredProposal = (reset: UseFormReset<ProposalSchema>) => {
  const { handleOpenConfirmDialog } = useConfirmDialog()

  useEffect(() => {
    const getStoredProposal = () => {
      const storedProposal = localStorage.getItem(StorageKeys.Proposal)
      if (storedProposal)
        handleOpenConfirmDialog({
          title: 'Você possui uma proposta salva',
          message: 'Deseja continuar o cadastro de onde parou?',
          confirmButton: {
            children: 'Sim',
            onClick: () => reset(JSON.parse(storedProposal)),
          },
          cancelButton: {
            children: 'Não',
            onClick: () => {
              localStorage.removeItem(StorageKeys.Proposal)
            },
          },
        })
    }

    getStoredProposal()
  }, [handleOpenConfirmDialog, reset])
}
