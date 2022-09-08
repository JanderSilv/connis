import { ElementType } from 'react'
import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material'

type ContainerProps = {
  component?: ElementType
} & MuiContainerProps

export const Container = (props: ContainerProps) => <MuiContainer maxWidth="lg" {...props} />
