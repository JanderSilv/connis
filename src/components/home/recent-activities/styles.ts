import { Box, styled, Typography } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  marginInline: 'auto',
  backgroundColor: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(10px)',

  borderRadius: 5,
  flex: 1,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 4),
    boxShadow: theme.shadows[4],
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1, 4),

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}))
Header.defaultProps = {
  component: 'header',
}

export const EmptyTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  textAlign: 'center',
}))
