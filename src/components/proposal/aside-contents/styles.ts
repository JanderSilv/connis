import { Box, styled } from '@mui/material'

export const CompanyHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}))
CompanyHeader.defaultProps = {
  component: 'header',
}
