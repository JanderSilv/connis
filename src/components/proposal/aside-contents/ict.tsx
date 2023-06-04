import { Button, Divider, Stack, Typography } from '@mui/material'
import { Company } from 'src/models/types'
import { ActionsHeader } from './actions-header'
import { CompanyData } from './common'

type Props = Company

export const ICTAsideContent = (company: Props) => (
  <>
    <CompanyData type="company" {...company} />

    <Divider sx={{ mt: 2, mb: 1 }} />

    <ActionsHeader>
      <ul>
        <li>
          <Typography>{`"Iniciar negociação" indica que você concorda com as condições da proposta e deseja prosseguir com a negociação`}</Typography>
        </li>
        <li>
          <Typography>{`"Fazer contra proposta" indica que você se interessou pela proposta mas gostaria de alterar algumas condições.`}</Typography>
        </li>
        <li>
          <Typography>{`"Recusar proposta" avisará a empresa que você não possui interesse na negociação.`}</Typography>
        </li>
      </ul>
    </ActionsHeader>

    <Stack mt={1} gap={1}>
      <Button variant="contained" color="primary" fullWidth>
        Iniciar negociação
      </Button>

      <Button variant="contained" color="warning" fullWidth>
        Fazer contra proposta
      </Button>

      <Button variant="contained" color="error" fullWidth>
        Recusar proposta
      </Button>
    </Stack>
  </>
)
