import { Box, styled } from '@mui/material'

export type WrapperProps = {
  illustrationPosition?: 'left' | 'right'
}

export const Wrapper = styled(Box)<WrapperProps>(({ theme, illustrationPosition = 'right' }) => ({
  width: '100%',
  minHeight: '100vh',
  padding: theme.spacing(4),
  paddingBottom: 'unset',

  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'space-between',
  rowGap: theme.spacing(4),

  '&:after': {
    content: '""',
    display: 'block',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 200,
      background: 'center / contain no-repeat url(/assets/auth/business-make-connection.svg)',
    },
  },

  [theme.breakpoints.up('sm')]: {
    paddingBottom: theme.spacing(4),
    background:
      illustrationPosition === 'right'
        ? '95% bottom / 300px no-repeat url(/assets/auth/business-make-connection.svg)'
        : '5% bottom / 300px no-repeat url(/assets/auth/business-make-connection.svg)',
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}
