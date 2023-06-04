import { BottomNavigation as MuiBottomNavigation, styled } from '@mui/material'

export const BottomNavigation = styled(MuiBottomNavigation)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))
