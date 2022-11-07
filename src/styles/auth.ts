import { Box, styled } from '@mui/material'

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
