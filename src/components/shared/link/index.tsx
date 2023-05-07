import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

type LinkProps = {
  children?: ReactNode
} & NextLinkProps &
  MuiLinkProps

export const Link = ({ children, ...rest }: LinkProps) => (
  <MuiLink component={NextLink} underline="hover" {...rest}>
    {children}
  </MuiLink>
)
