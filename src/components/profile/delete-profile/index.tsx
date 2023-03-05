import { Alert, Button, Stack, Typography } from '@mui/material'

import { User } from 'src/models/types'

import { useDeleteDialog } from 'src/hooks'
import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'

import { DeleteIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

type DeleteProfileSectionProps = {
  user: User
}

export const DeleteProfileSection = (props: DeleteProfileSectionProps) => {
  const { user } = props

  const { DeleteDialog, isDeleteDialogOpen, handleOpenDeleteDialog } = useDeleteDialog({
    title: 'Deletar conta',
    description: (
      <>
        Connis irá <strong>deletar</strong> todas as suas propostas, ofertas, negociações e todos os recursos que
        pertencem a sua conta.
        <Alert variant="filled" severity="error" sx={{ mt: 1 }}>
          Essa ação é irreversível, tenha certeza.
        </Alert>
      </>
    ),
    confirmText: (() => {
      if (checkUserIsCompany(user) || checkUserIsICT(user)) return user.slug
      else return 'deletar esta conta'
    })(),
  })

  return (
    <Section mt={3} border="2px solid" borderColor="error.light">
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
