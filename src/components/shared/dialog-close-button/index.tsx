import { IconButton, IconButtonProps } from '@mui/material'
import { CloseIcon } from 'src/assets/icons'

type CloseButtonProps = IconButtonProps

export const DialogCloseButton = ({ sx, ...props }: CloseButtonProps) => (
  <IconButton {...props} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, ...sx }}>
    <CloseIcon />
  </IconButton>
)
