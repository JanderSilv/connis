import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { pages } from 'src/constants'
import { CompanyUser } from 'src/models/types'
import { CompanyData } from './common'

type Props = CompanyUser

export const DefaultAsideContent = (company: Props) => {
  const { asPath } = useRouter()

  return (
    <>
      <CompanyData {...company} />

      <Stack mt={3} gap={1}>
        <Link href={`${pages.login}?callbackUrl=${asPath}`} passHref>
          <Button component="a" variant="contained" color="primary" fullWidth>
            Estou Interessado
          </Button>
        </Link>
      </Stack>
    </>
  )
}
