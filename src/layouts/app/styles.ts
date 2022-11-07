import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
}))
Wrapper.defaultProps = {
  component: 'section',
}
