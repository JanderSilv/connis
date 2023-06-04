import { createContext, useCallback, useContext, useState } from 'react'
import { Box, Button, ButtonProps, Dialog, DialogActions, DialogContentText, DialogTitle, SvgIcon } from '@mui/material'
import { InfoIcon } from 'src/assets/icons'

type ConfirmDialogContent = {
  icon?: typeof SvgIcon
  title?: string
  message?: string
  confirmButton?: ButtonProps
  cancelButton?: ButtonProps
  cannotCloseAtClickOutside?: boolean
}

type ConfirmDialogContextType = {
  handleOpenConfirmDialog: (content: ConfirmDialogContent) => void
}

export const ConfirmDialogContext = createContext({} as ConfirmDialogContextType)

type ConfirmDialogProviderProps = {
  children: React.ReactNode
}

export const ConfirmDialogProvider = (props: ConfirmDialogProviderProps) => {
  const { children } = props

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState<ConfirmDialogContent>()

  const handleOpenConfirmDialog = useCallback((content: ConfirmDialogContent) => {
    setDialogContent(content)
    setIsConfirmDialogOpen(true)
  }, [])

  return (
    <ConfirmDialogContext.Provider
      value={{
        handleOpenConfirmDialog,
      }}
    >
      {children}

      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => !dialogContent?.cannotCloseAtClickOutside && setIsConfirmDialogOpen(false)}
        maxWidth="xs"
      >
        <Box mt={2} textAlign="center">
          {dialogContent?.icon ? (
            <dialogContent.icon color="primary" sx={{ fontSize: 40 }} />
          ) : (
            <InfoIcon color="primary" sx={{ fontSize: 40 }} />
          )}
        </Box>
        <DialogTitle textAlign="center" sx={{ py: 1 }}>
          {dialogContent?.title}
        </DialogTitle>
        <DialogContentText px={2} textAlign="center">
          {dialogContent?.message}
        </DialogContentText>
        <DialogActions>
          <Button
            color="error"
            {...dialogContent?.cancelButton}
            onClick={event => {
              setIsConfirmDialogOpen(false)
              dialogContent?.cancelButton?.onClick?.(event)
            }}
          >
            {dialogContent?.cancelButton?.children || 'Cancelar'}
          </Button>
          <Button
            {...dialogContent?.confirmButton}
            onClick={event => {
              setIsConfirmDialogOpen(false)
              dialogContent?.confirmButton?.onClick?.(event)
            }}
          >
            {dialogContent?.confirmButton?.children || 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmDialogContext.Provider>
  )
}

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext)
  if (context === undefined) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider')
  }
  return context
}
