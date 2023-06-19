import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { initMouseflow } from 'src/config'
import { AppProviders } from 'src/contexts/providers'
import createEmotionCache from 'src/helpers/createEmotionCache'
import { theme } from 'src/styles/theme'

const clientSideEmotionCache = createEmotionCache()

setDefaultOptions({ locale: ptBR })

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  useEffect(() => {
    setDefaultOptions({ locale: ptBR })
    initMouseflow()
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <AppProviders>
              <Component {...pageProps} />
            </AppProviders>
          </SnackbarProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
