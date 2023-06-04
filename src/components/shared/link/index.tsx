import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

type LinkProps = {
  noEffect?: boolean
  openInNewTab?: boolean
} & NextLinkProps &
  MuiLinkProps

const openInNewTabProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

export const Link = ({ children, noEffect, openInNewTab, ...rest }: LinkProps) => (
  <MuiLink
    component={!openInNewTab ? NextLink : 'a'}
    underline={noEffect ? 'none' : 'hover'}
    color={noEffect ? 'inherit' : 'primary'}
    {...rest}
    {...(openInNewTab ? openInNewTabProps : {})}
  >
    {children}
  </MuiLink>
)
