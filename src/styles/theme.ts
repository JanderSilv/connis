import { createTheme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
      contrastText: '#FFF',
    },
    background: {
      default: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: 'Rubik',
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
})
