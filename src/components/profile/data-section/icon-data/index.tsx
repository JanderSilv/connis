import { Stack, SvgIcon, Typography } from '@mui/material'

export type IconDataProps = {
  icon: typeof SvgIcon
  children?: React.ReactNode
}

export const IconData = ({ icon: Icon, children }: IconDataProps) => (
  <Stack direction="row" spacing={1} alignItems="center" color="grey.800">
    <Icon fontSize="small" color="inherit" />
    {typeof children === 'string' ? <Typography color="inherit">{children}</Typography> : children}
  </Stack>
)
