import { Box, Button, ButtonProps, styled, Typography } from '@mui/material'

export const Title = styled(Typography)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),

  fontSize: '1.5rem',
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}))
Title.defaultProps = {
  variant: 'h1',
  color: 'primary',
}

const illustrationPath = '/assets/illustrations/solved-the-problem.svg'
export const Wrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),

  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4, 8),

  [theme.breakpoints.down('sm')]: {
    '&:after': {
      content: '""',
      width: '100%',
      height: 200,
      background: `center / contain no-repeat url(${illustrationPath})`,
      display: 'block',
    },
  },

  [theme.breakpoints.up('sm')]: {
    background: `bottom right / 300px no-repeat url(${illustrationPath})`,
  },
  [theme.breakpoints.up('md')]: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
    flexWrap: 'nowrap',
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

type ProposalButtonProps = {
  component?: React.ElementType
} & ButtonProps
export const ProposalButton = styled(Button)<ProposalButtonProps>(({ theme }) => ({
  maxWidth: 303,
  padding: theme.spacing(2),
  textAlign: 'center',
  textTransform: 'initial',

  borderRadius: 10,
  backgroundColor: 'rgba(255,255,255,0.7)',
  boxShadow: theme.shadows[4],
  backdropFilter: 'blur(10px)',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
}))
ProposalButton.defaultProps = {
  component: 'a',
}
