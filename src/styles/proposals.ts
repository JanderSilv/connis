import {
  Box,
  Checkbox as MuiCheckbox,
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormLabel as MuiFormLabel,
  FormLabelProps as MuiFormLabelProps,
  Slider as MuiSlider,
  styled,
} from '@mui/material'
import { Component } from 'src/models/types'

export const Wrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4, 5),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
    justifyContent: 'space-between',
  },
}))
Wrapper.defaultProps = {
  component: 'main',
}

export const AsideB = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),

  [theme.breakpoints.between('sm', 'lg')]: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
}))
AsideB.defaultProps = {
  component: 'aside',
}

type FormControlProps = Component & MuiFormControlProps

export const FormControl = styled(MuiFormControl)<FormControlProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}))
FormControl.defaultProps = {
  component: 'fieldset',
  variant: 'standard',
}

type FormLabelProps = Component & MuiFormLabelProps

export const FormLabel = styled(MuiFormLabel)<FormLabelProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}))
FormLabel.defaultProps = {
  component: 'legend',
}

export const Checkbox = styled(MuiCheckbox)(() => ({}))
Checkbox.defaultProps = {
  size: 'small',
}

export const Slider = styled(MuiSlider)(() => ({
  "& > .MuiSlider-markLabel[data-index='0']": {
    transform: 'none',
  },
  "& > .MuiSlider-markLabel[data-index='1']": {
    transform: 'translateX(-100%)',
  },
}))
