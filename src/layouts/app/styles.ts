import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
}))
Wrapper.defaultProps = {
  component: 'section',
}
