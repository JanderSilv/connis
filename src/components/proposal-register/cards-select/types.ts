import { SvgIcon } from '@mui/material'
import { CarouselProps } from 'react-multi-carousel'

export type CardData = {
  id: number
  label?: string
  title: string
  icon: typeof SvgIcon
  description: string
  solo?: boolean
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
  options: CardData[]
  carousel?: CarouselProps
  error?: boolean
  helperText?: string
} & (CardsSelectUnique | CardsSelectMultiple)
