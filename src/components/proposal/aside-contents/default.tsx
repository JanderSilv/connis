import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { pages } from 'src/constants'
import { Company } from 'src/models/types'
import { CompanyData } from './common'

type Props = Company

export const DefaultAsideContent = (company: Props) => {
  const { asPath } = useRouter()

  return (
    <>
      <CompanyData type="company" {...company} />

      <Stack mt={3} gap={1}>
        <Button
          component={Link}
          href={`${pages.login}?callbackUrl=${asPath}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Estou Interessado
        </Button>
      </Stack>
    </>
  )
}
