import { Box, styled } from '@mui/material'

export const Section = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    borderRadius: 10,
    boxShadow: theme.shadows[3],
  },
}))
Section.defaultProps = {
  component: 'section',
}
