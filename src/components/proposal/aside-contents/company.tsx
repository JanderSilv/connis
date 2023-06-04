import Link from 'next/link'
import useImmutableSWR from 'swr/immutable'
import { Button, Divider, Stack, Typography } from '@mui/material'

import { pages } from 'src/constants'
import { useMakeAnOffer } from 'src/hooks/proposal'
import { OfferCategory } from 'src/models/enums'
import { Negotiation, Proposal } from 'src/models/types'

import { ActionsHeader } from './actions-header'
import { CompanyData } from './common'
import { proposalService } from 'src/services'
import { useSession } from 'next-auth/react'

type Props = {
  proposal: Proposal
}

export const OfferCompanyAsideContent = (props: Props) => {
  const { proposal } = props

  const { MakeAnOfferDialog, handleOpenMakeAnOfferDialog } = useMakeAnOffer(proposal)
  const { data: session } = useSession()

  const { data: negotiations } = useImmutableSWR(
    [
      `${proposalService.baseUrl}/negotiations`,
      {
        companyInterestedId: session?.user.companyId,
      },
    ],
    proposalService.getCompanyNegotiationsFetcher
  )

  const negotiation = negotiations?.find(negotiation => negotiation.proposal.id === proposal.id)

  return (
    <>
      <CompanyData type="company" {...proposal.company} />

      <Divider sx={{ mt: 2, mb: 1 }} />

      {!negotiation ? (
        <>
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
        </>
      ) : (
        <Button
          component={Link}
          href={`${pages.proposal}/${proposal.id}/negociacao/${negotiation.id}`}
          variant="outlined"
          fullWidth
        >
          Ir para negociação
        </Button>
      )}

      <MakeAnOfferDialog />
    </>
  )
}
