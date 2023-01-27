import { styled } from '@mui/material'

type OfferStepIconProps = {
  ownerState: {
    completed?: boolean
    active?: boolean
  }
}

export const OfferStepIconRoot = styled('div')<OfferStepIconProps>(({ theme, ownerState }) => ({
  width: 30,
  height: 30,

  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  transition: 'box-shadow 0.3s ease-in-out',

  ...(ownerState.active && {
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
}))
