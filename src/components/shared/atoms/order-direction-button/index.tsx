import { forwardRef } from 'react'
import { Button, ButtonProps } from '@mui/material'

import { OrderDirection } from 'src/models/enums'

import { ArrowUpwardIcon, ArrowDownwardIcon } from 'src/assets/icons'

type OrderDirectionButtonProps = {
  value: OrderDirection
  onClick: (value: OrderDirection) => void
} & Omit<ButtonProps, 'onClick'>

export const OrderDirectionButton = forwardRef<HTMLButtonElement, OrderDirectionButtonProps>((props, ref) => {
  const { value = OrderDirection.Desc, onClick, ...rest } = props

  return (
    <Button
      ref={ref}
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
})

OrderDirectionButton.displayName = 'OrderDirectionButton'
