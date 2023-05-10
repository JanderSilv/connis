import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { BoxProps, Stack } from '@mui/material'

import { pages } from 'src/constants'

import { Link } from 'src/components/shared'

import { Wrapper, WrapperProps } from './styles'

type LayoutProps = {
  documentTitle?: string
} & BoxProps &
  WrapperProps

export const Layout = ({ children, showFooter, documentTitle, ...rest }: LayoutProps) => (
  <Wrapper showFooter={showFooter} {...rest}>
    <Head>
      <title>{!!documentTitle ? `${documentTitle} - Connis` : 'Connis'}</title>
    </Head>

    <Stack component="header" direction="row" spacing={2}>
      <NextLink href={pages.login}>
        <Image src="/assets/logo/logo.svg" width="117" height="40" alt="Logo do Connis" />
      </NextLink>
    </Stack>

    {children}

    {showFooter && (
      <Stack direction="row" spacing={2}>
        <Link href={pages.privacyPolicy}>Política de privacidade</Link>
        <Link href={pages.termsOfUse}>Termos de uso</Link>
      </Stack>
    )}
  </Wrapper>
)
