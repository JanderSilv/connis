import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
Wrapper.defaultProps = {
  component: 'section',
}
