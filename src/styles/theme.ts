import { createTheme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import { Rubik } from 'next/font/google'

export const rubik = Rubik({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

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
    fontFamily: rubik.style.fontFamily,
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      defaultProps: {
        sx: {
          padding: 1,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
        },
      },
    },
  },
})
