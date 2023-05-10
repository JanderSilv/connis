import { Box, styled } from '@mui/material'

export type WrapperProps = {
  illustration?: {
    position?: 'left' | 'right'
    breakpoint?: 'sm' | 'md'
  }
  showFooter?: boolean
}

export const Wrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'illustration' && prop !== 'showFooter',
})<WrapperProps>(({ theme, illustration, showFooter }) => ({
  width: '100%',
  minHeight: '100vh',
  padding: theme.spacing(4),
  paddingBottom: 'unset',

  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'space-between',
  rowGap: theme.spacing(4),

  [theme.breakpoints.up(illustration?.breakpoint || 'sm')]: {
    paddingBottom: theme.spacing(4),
    background: 'bottom / 300px no-repeat url(/assets/auth/business-make-connection.svg)',
    backgroundPositionX: illustration?.position === 'left' ? '10%' : '95%',
  },

  '&:after': {
    content: '""',
    display: !showFooter ? 'block' : 'none',

    [theme.breakpoints.down(illustration?.breakpoint || 'sm')]: {
      width: '100%',
      height: 200,
      background: 'center / contain no-repeat url(/assets/auth/business-make-connection.svg)',
      display: 'block',
    },
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}
