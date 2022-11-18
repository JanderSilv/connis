import { SvgIconComponent } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

type Props = {
  icon: SvgIconComponent
  title: string
  selected: boolean
}

export const ProposalTypeData = ({ icon: Icon, title, selected }: Props) => {
  return (
    <Stack color={selected ? 'primary.main' : 'text.secondary'} alignItems="center" gap={1} flex={1}>
      <Icon color="inherit" fontSize="large" />
      <Typography variant="body2" color="inherit" fontWeight={500}>
        {title}
      </Typography>
    </Stack>
  )
}
