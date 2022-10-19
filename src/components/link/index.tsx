import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps, styled } from '@mui/material'

type LinkProps = NextLinkProps & {
  muiLinkProps?: MuiLinkProps
  children?: ReactNode
}

const StyledLink = styled(MuiLink)({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

export const Link = ({ muiLinkProps, children, ...rest }: LinkProps) => (
  <NextLink {...rest} passHref>
    <StyledLink {...muiLinkProps}>{children}</StyledLink>
  </NextLink>
)
