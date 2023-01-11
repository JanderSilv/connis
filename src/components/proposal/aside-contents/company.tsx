import { Button, Stack } from '@mui/material'
import { CompanyUser } from 'src/models/types'
import { CompanyData } from './common'

type Props = CompanyUser

export const OfferCompanyAsideContent = (company: Props) => (
  <>
    <CompanyData {...company} />

    <Stack mt={3} gap={1}>
      <Button variant="contained" color="primary" fullWidth>
        Estou Interessado
      </Button>

      <Button variant="contained" color="warning" fullWidth>
        Fazer contra proposta
      </Button>
    </Stack>
  </>
)
