import { Ref } from 'react'
import { SvgIcon } from '@mui/material'
import Carousel, { CarouselProps } from 'react-multi-carousel'

export type CardData = {
  id: number
  label?: string
  title: string
  icon: typeof SvgIcon
  description: string
  solo?: boolean
  disabled?: boolean
}

type CardsSelectUnique = {
  value: number
  onChange: (id: number) => void
  multiple?: never
}
type CardsSelectMultiple = {
  value: number[]
  onChange: (ids: number[]) => void
  multiple: true
}

export type CardsSelectProps = {
  id?: string
  options: CardData[]
  carousel?: Omit<CarouselProps, 'children'>
  error?: boolean
  helperText?: string
  carouselRef?: Ref<Carousel>
  disabled?: boolean
} & (CardsSelectUnique | CardsSelectMultiple)
