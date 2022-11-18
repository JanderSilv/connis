import { Box, styled, Typography } from '@mui/material'
import { trls } from 'src/data/proposal'
import { TRL } from 'src/models/enums'

type Props = {
  trl: TRL
}

export const TRLData = ({ trl }: Props) => {
  const { description, icon: Icon, label, title } = trls[trl]
  return (
    <TRLBox>
      <Typography component="h3" variant="h5">
        {label}
      </Typography>
      <Typography component="h4" variant="h5" mb={1}>
        {title}
      </Typography>
      <Icon fontSize="large" color="primary" />
      <Typography variant="body2">{description}</Typography>
    </TRLBox>
  )
}

export const TRLBox = styled(Box)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),

  '& > h3': {
    width: 'fit-content',
    padding: theme.spacing(0.5, 2),
    color: theme.palette.primary.contrastText,
    borderRadius: 4,
    background: theme.palette.primary.main,
  },
  '& > h4': {
    fontWeight: theme.typography.fontWeightBold,
  },
}))
