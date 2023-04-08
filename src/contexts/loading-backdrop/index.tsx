import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { Backdrop, Button, ButtonProps, CircularProgress, Stack, Typography, TypographyProps } from '@mui/material'

type LoadingBackdropContextData = {
  toggleLoading: (content?: Content) => void
}

export const LoadingBackdropContext = createContext({} as LoadingBackdropContextData)

type LoadingBackdropProviderProps = {
  children: ReactNode
}

type Content = {
  description?: ReactNode
  button?: ButtonProps
  descriptionProps?: TypographyProps
}

export const LoadingBackdropProvider = ({ children }: LoadingBackdropProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<Content>()

  const toggleLoading = useCallback((content?: Content) => {
    setLoading(prevLoading => !prevLoading)
    setContent(content)
  }, [])

  return (
    <LoadingBackdropContext.Provider
      value={{
        toggleLoading,
      }}
    >
      {children}

      <Backdrop open={loading} sx={{ color: 'white', zIndex: 'tooltip' }}>
        <Stack alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          {content?.description && (
            <Typography color="inherit" textAlign="center" {...content?.descriptionProps}>
              {content?.description}
            </Typography>
          )}

          {content?.button && <Button variant="outlined" color="inherit" size="small" {...content?.button} />}
        </Stack>
      </Backdrop>
    </LoadingBackdropContext.Provider>
  )
}

export const useLoadingBackdrop = () => {
  const { toggleLoading } = useContext(LoadingBackdropContext)

  return {
    toggleLoading,
  }
}
