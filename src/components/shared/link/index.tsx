import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

type LinkProps = NextLinkProps & {
  muiLinkProps?: MuiLinkProps
  children?: ReactNode
}

export const Link = ({ muiLinkProps, children, ...rest }: LinkProps) => (
  <NextLink {...rest} passHref legacyBehavior>
    <MuiLink underline="hover" {...muiLinkProps}>
      {children}
    </MuiLink>
  </NextLink>
)
