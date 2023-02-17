import { Box, styled } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  maxHeight: 500,
  padding: theme.spacing(4),
  overflowY: 'auto',
}))
