import { Card as MuiCard, CardContent as MuiCardContent, styled, SxProps } from '@mui/material'
import CarouselComponent from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const Carousel = styled(CarouselComponent)(({ theme }) => ({
  '& .trl-carousel-item': {
    padding: theme.spacing(1),
    '&:first-of-type': {
      paddingLeft: 0,
    },
  },
}))
Carousel.defaultProps = {
  itemClass: 'trl-carousel-item',
}

export const Card = styled(MuiCard)({
  maxWidth: 300,
  height: '100%',
  transition: 'all 0.3s ease-in-out',

  '& > button': {
    height: '100%',
  },
})

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
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
  '& > svg': {
    color: theme.palette.primary.main,
  },
}))

export const selectedCard: SxProps = {
  color: 'primary.contrastText',
  backgroundColor: 'primary.main',
  '&& svg': {
    color: 'primary.contrastText',
  },
}
