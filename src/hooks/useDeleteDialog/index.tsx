import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
} from '@mui/material'

type DeleteDialogSchema = zod.infer<ReturnType<typeof makeDeleteDialogValidationSchema>>

type DeleteDialogData = {
  title: string
  description: React.ReactNode
  confirmText: string
  onDelete: () => void
}

type DeleteDialogProps = {
  open: boolean
  onClose: () => void
} & DeleteDialogData

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { title, description, confirmText, onClose, open, onDelete } = props

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DeleteDialogSchema>({
    resolver: zodResolver(makeDeleteDialogValidationSchema(confirmText)),
  })

  const handleDelete = () => {
    onDelete()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle textAlign="center">{title}</DialogTitle>

      <DialogContentText px={2} textAlign="center">
        {description}
      </DialogContentText>

      <form onSubmit={handleSubmit(handleDelete)}>
        <DialogContent>
          <FormLabel
            htmlFor="confirmText"
            sx={({ typography }) => ({
              fontSize: typography.pxToRem(14),
            })}
          >
            Digite <strong>{confirmText}</strong> para confirmar:
          </FormLabel>
          <TextField
            id="confirmText"
            {...register('confirmText')}
            error={!!errors.confirmText}
            helperText={errors.confirmText?.message}
            sx={{ mt: 0.5 }}
            size="small"
            hiddenLabel
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" color="error">
            Deletar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export const useDeleteDialog = (data: DeleteDialogData) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDeleteDialog = () => setIsOpen(true)

  return {
    DeleteDialog: useCallback(
      () => <DeleteDialog open={isOpen} onClose={() => setIsOpen(false)} {...data} />,
      [data, isOpen]
    ),
    isDeleteDialogOpen: isOpen,
    handleOpenDeleteDialog,
  }
}

const makeDeleteDialogValidationSchema = (confirmText: string) =>
  zod.object({
    confirmText: zod
      .string()
      .min(1, 'A confirmação é obrigatória')
      .refine(value => value === confirmText, {
        message: 'A confirmação não confere',
      }),
  })
