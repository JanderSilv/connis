import { Box, BoxProps, Button, styled, Typography } from '@mui/material'
import { GoogleIcon, MicrosoftIcon } from 'src/assets/icons'

type SocialLoginButtonsProps = BoxProps

export const SocialLoginButtons = (props: SocialLoginButtonsProps) => {
  return (
    <Wrapper {...props}>
      <OrTypography>Ou</OrTypography>
      <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
        Entrar com o Google
      </Button>
      <Button variant="outlined" startIcon={<MicrosoftIcon />} fullWidth>
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
