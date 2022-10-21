import { Box, Button as MuiButton, styled, Typography } from '@mui/material'

export const Form = styled(Box)(({ theme }) => ({
  width: '100%',
  marginInline: 'auto',
  borderRadius: 10,
  backdropFilter: 'blur(10px)',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
    padding: theme.spacing(4, 8),
    backgroundColor: 'rgba(255,255,255,0.7)',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  },
}))
Form.defaultProps = {
  component: 'form',
}

export const Button = styled(MuiButton)(({ theme }) => ({
  padding: theme.spacing(1),
}))

export const ForgotPasswordTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}))
ForgotPasswordTypography.defaultProps = {
  variant: 'body2',
}

export const OrTypography = styled(Typography)(({ theme }) => ({
  width: '100%',
  color: theme.palette.grey[600],
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  '&:before, &:after': {
    content: '""',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1,
  },
}))
