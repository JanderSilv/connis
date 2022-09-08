import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
}))
Wrapper.defaultProps = {
  component: 'section',
}
