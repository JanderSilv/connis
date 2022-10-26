import { ComponentProps, forwardRef } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { IMaskMixin } from 'react-imask'

const MaskMixin = IMaskMixin(({ inputRef, ...rest }) => <TextField inputRef={inputRef} {...(rest as any)} />)

type MaskedTextFieldProps = ComponentProps<typeof MaskMixin> & TextFieldProps

export const MaskedTextField = forwardRef<HTMLInputElement, MaskedTextFieldProps>((props, ref) => (
  <MaskMixin inputRef={ref} {...props} />
))
MaskedTextField.displayName = 'MaskedTextField'
