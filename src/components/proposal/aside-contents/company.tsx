import { Button, Divider, Stack, Typography } from '@mui/material'

import { useMakeAnOffer } from 'src/hooks/proposal'
import { OfferCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { ActionsHeader } from './actions-header'
import { CompanyData } from './common'

type Props = {
  proposal: Proposal
}

export const OfferCompanyAsideContent = ({ proposal }: Props) => {
  const { MakeAnOfferDialog, handleOpenMakeAnOfferDialog } = useMakeAnOffer(proposal)

  return (
    <>
      <CompanyData {...proposal.company} />

      <Divider sx={{ mt: 2, mb: 1 }} />

      <ActionsHeader>
        <ul>
          <li>
            <Typography>{`"Estou Interessado" indica que você concorda com as condições da proposta e deseja fazer uma oferta de negociação.`}</Typography>
          </li>
          <li>
            <Typography>{`"Fazer contra proposta" indica que você se interessou pela proposta mas gostaria de alterar algumas condições.`}</Typography>
          </li>
        </ul>
      </ActionsHeader>

      <Stack mt={1} gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenMakeAnOfferDialog(OfferCategory.default)}
          fullWidth
        >
          Estou Interessado
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => handleOpenMakeAnOfferDialog(OfferCategory.counterProposal)}
          fullWidth
        >
          Fazer Contra Proposta
        </Button>
      </Stack>

      <MakeAnOfferDialog />
    </>
  )
}
