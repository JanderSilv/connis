import { useRouter } from 'next/router'
import { Box, BoxProps, Button, styled, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import { GoogleIcon, MicrosoftIcon } from 'src/assets/icons'

type SocialLoginButtonsProps = BoxProps

export const SocialLoginButtons = (props: SocialLoginButtonsProps) => {
  const { query } = useRouter()
  const callbackUrl = (query.callbackUrl as string) || undefined

  return (
    <Wrapper {...props}>
      <OrTypography>Ou</OrTypography>
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() =>
          signIn('google', {
            callbackUrl,
          })
        }
        fullWidth
      >
        Entrar com o Google
      </Button>
      <Button
        variant="outlined"
        startIcon={<MicrosoftIcon />}
        onClick={() =>
          signIn('azure-ad', {
            callbackUrl,
          })
        }
        fullWidth
      >
        Entrar com a Microsoft
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

export const OrTypography = styled(Typography)(({ theme }) => ({
  width: '100%',
  color: theme.palette.grey[600],
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  '&:before, &:after': {
    content: '""',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1,
  },
}))
