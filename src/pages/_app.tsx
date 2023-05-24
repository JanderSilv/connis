import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AppProviders } from 'src/contexts/providers'
import createEmotionCache from 'src/helpers/createEmotionCache'
import { theme } from 'src/styles/theme'
import { api } from 'src/services/api'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

setDefaultOptions({ locale: ptBR })

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
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

export default api.withTRPC(MyApp)
