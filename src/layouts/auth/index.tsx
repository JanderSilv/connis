import { BoxProps } from '@mui/material'
import Image from 'next/image'
import { Wrapper, WrapperProps } from './styles'

type LayoutProps = BoxProps & WrapperProps

export const Layout = ({ children, ...rest }: LayoutProps) => (
  <Wrapper {...rest}>
    <Image src="/assets/logo/logo.svg" width="117" height="40" alt="Logo do Connis" />
    {children}
  </Wrapper>
)
