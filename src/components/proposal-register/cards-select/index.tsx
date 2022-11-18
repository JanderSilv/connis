import { CardActionArea, Typography, useMediaQuery, Theme, Collapse } from '@mui/material'
import { ResponsiveType } from 'react-multi-carousel'
import { Card, CardContent, Carousel, selectedCard } from './styles'
import { CardsSelectProps } from './types'
export type { CardData } from './types'

const responsive: ResponsiveType = {
  lg: {
    breakpoint: { max: 4000, min: 1200 },
    items: 4,
    slidesToSlide: 4,
  },
  md: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

export const CardsSelect = (props: CardsSelectProps) => {
  const { id: cardsSelectId, value, onChange, helperText, error, carousel, options, multiple, carouselRef } = props
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const handleOnChange = (id: number, solo?: boolean) => {
    if (!multiple) return onChange(id)
    if (solo || !value) onChange([id])
    else {
      if (value.includes(id)) return onChange(value.filter(item => item !== id))
      const filteredIds = value.filter(id => !options.find(option => option.id === id)?.solo)
      onChange([...filteredIds, id])
    }
  }

  return (
    <>
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        beforeChange={nextSlide => {
          if (isMobile) handleOnChange(nextSlide, options[nextSlide].solo)
        }}
        {...carousel}
      >
        {options.map((cardData, index) => {
          const { id, label, title, icon: Icon, description, solo } = cardData
          return (
            <Card
              id={index === 0 ? cardsSelectId : undefined}
              key={id}
              sx={(() => {
                if (!multiple) return value === id ? selectedCard : {}
                if (value?.includes(id)) return selectedCard
                return {}
              })()}
            >
              <CardActionArea onClick={() => handleOnChange(id, solo)}>
                <CardContent>
                  {!!label && <Typography component="h3">{label}</Typography>}
                  <Typography component={!!label ? 'h4' : 'h3'} mb={1}>
                    {title}
                  </Typography>
                  <Icon fontSize="large" />
                  <Typography fontSize="0.875rem">{description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Carousel>
      <Collapse in={!!helperText}>
        <Typography color={error ? 'red' : undefined} fontSize="0.75rem">
          {helperText}
        </Typography>
      </Collapse>
    </>
  )
}
