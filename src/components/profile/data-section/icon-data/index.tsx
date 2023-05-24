import { Stack, SvgIcon, SxProps, Typography } from '@mui/material'

export type IconDataProps = {
  icon: typeof SvgIcon
  children?: React.ReactNode
  sx?: SxProps
}

export const IconData = ({ icon: Icon, children, sx }: IconDataProps) => (
  <Stack direction="row" spacing={1} alignItems="center" color="grey.800" sx={sx}>
    <Icon fontSize="small" color="inherit" />
    {typeof children === 'string' ? <Typography color="inherit">{children}</Typography> : children}
  </Stack>
)
