import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import createEmotionCache from 'src/helpers/createEmotionCache'
import { theme } from 'src/styles/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  setDefaultOptions({ locale: ptBR })
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
