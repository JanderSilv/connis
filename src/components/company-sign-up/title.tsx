import { Typography, TypographyProps } from '@mui/material'

type TitleProps = {
  isDesktop?: boolean
} & TypographyProps

export const Title = ({ isDesktop = false, sx, ...rest }: TitleProps) => (
  <Typography
    variant="h1"
    color="primary"
    mb={1}
    sx={{
      ...sx,
      display: isDesktop
        ? {
            xs: 'none',
            md: 'block',
          }
        : {
            xs: 'block',
            md: 'none',
          },
    }}
    {...rest}
  >
    Cadastro
  </Typography>
)
