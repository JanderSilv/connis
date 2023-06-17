import { Button, ButtonProps } from '@mui/material'

import { OrderDirection } from 'src/models/enums'

import { ArrowUpwardIcon, ArrowDownwardIcon } from 'src/assets/icons'

type OrderDirectionButtonProps = {
  value: OrderDirection
  onClick: (value: OrderDirection) => void
} & Omit<ButtonProps, 'onClick'>

export const OrderDirectionButton = (props: OrderDirectionButtonProps) => {
  const { value, onClick, ...rest } = props

  return (
    <Button
      endIcon={value === OrderDirection.Asc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      onClick={() => {
        if (value === OrderDirection.Asc) onClick(OrderDirection.Desc)
        else onClick(OrderDirection.Asc)
      }}
      {...rest}
    >
      {value === OrderDirection.Desc ? 'Mais recentes' : 'Mais antigos'}
    </Button>
  )
}
