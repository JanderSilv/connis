import { Alert, Button, Stack, Typography } from '@mui/material'

import { User } from 'src/models/types'

import { useDeleteDialog } from 'src/hooks'

import { DeleteIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

type DeleteProfileSectionProps = {
  user: User
  entityToDelete: 'user' | 'organization'
  dialogDescription?: React.ReactNode
}

export const DeleteProfileSection = (props: DeleteProfileSectionProps) => {
  const { user, entityToDelete, dialogDescription } = props

  const { DeleteDialog, isDeleteDialogOpen, handleOpenDeleteDialog } = useDeleteDialog({
    title: 'Deletar conta',
    description: (
      <>
        {dialogDescription}
        <Alert variant="filled" severity="error" sx={{ mt: 1 }}>
          Essa ação é irreversível, tenha certeza.
        </Alert>
      </>
    ),
    confirmText: user.userName,
    userId: user.id,
    entityToDelete,
  })

  return (
    <Section my={3} p={{ xs: 2 }} border="2px solid" borderColor="error.light">
      <Typography component="h2" variant="h3">
        Deletar conta
      </Typography>

      <Typography mt={1}>
        Ao deletar sua conta, você não poderá mais acessar o sistema e todos os seus dados serão excluídos. Essa ação é
        irreversível, prossiga com cautela.
      </Typography>

      <Stack mt={1} direction="row" justifyContent="flex-end">
        <Button
          aria-expanded={isDeleteDialogOpen}
          aria-haspopup="dialog"
          startIcon={<DeleteIcon color="error" />}
          color="error"
          size="small"
          onClick={handleOpenDeleteDialog}
        >
          Deletar conta
        </Button>

        <DeleteDialog />
      </Stack>
    </Section>
  )
}
