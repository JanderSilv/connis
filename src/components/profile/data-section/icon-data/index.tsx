import { Stack, SvgIcon, Typography } from '@mui/material'

export type IconDataProps = {
  icon: typeof SvgIcon
  children?: React.ReactNode
  order?: number
}

export const IconData = ({ icon: Icon, children, order }: IconDataProps) => (
  <Stack direction="row" spacing={1} alignItems="center" color="grey.800" order={order}>
    <Icon fontSize="small" color="inherit" />
    {typeof children === 'string' ? <Typography color="inherit">{children}</Typography> : children}
  </Stack>
)
