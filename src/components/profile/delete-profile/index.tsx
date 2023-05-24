import { signOut } from 'next-auth/react'
import { Alert, Button, Stack, Typography } from '@mui/material'

import { User } from 'src/models/types'

import { pages } from 'src/constants'
import { useLoadingBackdrop } from 'src/contexts'
import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'
import { toast } from 'src/helpers/toast'
import { DeleteDialog } from 'src/hooks'
import { api } from 'src/services/api'

import { DeleteIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'
import { useState } from 'react'

type DeleteProfileSectionProps = {
  user: User
  dialogDescription?: React.ReactNode
}

export const DeleteProfileSection = (props: DeleteProfileSectionProps) => {
  const { user, dialogDescription } = props

  const { toggleLoading } = useLoadingBackdrop()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleOpenDeleteDialog = () => setIsDeleteDialogOpen(true)

  const deleteUserMutation = api.user.delete.useMutation({
    onMutate: () => toggleLoading(),
    onError: () => {
      toast.show('Não foi possível deletar a conta, tente novamente mais tarde', 'error')
    },
    onSuccess: () => {
      // TODO: Redirect to "Sorry to see you go" page
      signOut({
        callbackUrl: pages.login,
      })
    },
    onSettled: () => {
      toggleLoading()
    },
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
      </Stack>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Deletar conta"
        description={
          <>
            {dialogDescription}
            <Alert variant="filled" severity="error" sx={{ mt: 1 }}>
              Essa ação é irreversível, tenha certeza.
            </Alert>
          </>
        }
        confirmText={(() => {
          if (checkUserIsCompany(user) || checkUserIsICT(user)) return user.slug
          else return 'deletar-conta'
        })()}
        onDelete={() => deleteUserMutation.mutate(user.id)}
      />
    </Section>
  )
}
