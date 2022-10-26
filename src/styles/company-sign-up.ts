import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },

  '& > *': {
    flex: 1,
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}

export const LeftContainer = styled(Box)(({ theme }) => ({
  '& > div': {
    maxWidth: 400,
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      maxWidth: 'fit-content',
      display: 'block',
      textAlign: 'left',
    },

    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(13),
      paddingTop: theme.spacing(5),
    },
  },
}))
LeftContainer.defaultProps = {
  component: 'section',
}

export const Form = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  marginInline: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))
Form.defaultProps = {
  component: 'form',
}
