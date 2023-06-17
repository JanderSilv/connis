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

export const Link = ({ href, children, noEffect, openInNewTab, ...rest }: LinkProps) => (
  <MuiLink
    href={!openInNewTab ? href : urlify(href as string)}
    component={!openInNewTab ? NextLink : 'a'}
    underline={noEffect ? 'none' : 'hover'}
    color={noEffect ? 'inherit' : 'primary'}
    {...rest}
    {...(openInNewTab ? openInNewTabProps : {})}
  >
    {children}
  </MuiLink>
)

const urlify = (url: string) => (!/^(?:f|ht)tps?:\/\//.test(url) ? `http://${url}` : url)
