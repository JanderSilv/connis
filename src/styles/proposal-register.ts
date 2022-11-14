import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 4),
  },

  '& label': {
    display: 'block',
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}

export const ProductionContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  marginTop: theme.spacing(1),

  display: 'flex',
  alignItems: 'flex-end',
  rowGap: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  '& > *': {
    flex: 1,
  },
}))
