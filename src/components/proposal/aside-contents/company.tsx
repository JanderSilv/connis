import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useImmutableSWR from 'swr/immutable'
import { Button, Divider, Stack, Typography } from '@mui/material'

import { OfferCategory, OfferStatus } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { pages } from 'src/constants'
import { useMakeAnOffer } from 'src/hooks/proposal'
import { negotiationService } from 'src/services'

import { ActionsHeader } from './actions-header'
import { CompanyData } from './common'

type Props = {
  proposal: Proposal
}

export const OfferCompanyAsideContent = (props: Props) => {
  const { proposal } = props

  const { MakeAnOfferDialog, handleOpenMakeAnOfferDialog } = useMakeAnOffer(proposal, undefined, {
    refreshOnSubmit: true,
  })
  const { data: session } = useSession()

  const { data: negotiations } = useImmutableSWR(
    [
      `${negotiationService.baseUrl}/negotiations`,
      {
        proposalId: proposal.id,
        companyInterestedId: session?.user.companyId,
      },
    ],
    negotiationService.listFetcher
  )

  const negotiation = negotiations?.find(negotiation => negotiation.proposal.id === proposal.id)
  const proposalOwnerAcceptedOffer = negotiation?.offers.some(offer => offer.offerStatus === OfferStatus.accepted)

  return (
    <>
      <CompanyData type="company" {...proposal.company} />

      <Divider sx={{ mt: 2, mb: 1 }} />

      {(() => {
        if (!negotiation)
          return (
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
          )
        return proposalOwnerAcceptedOffer ? (
          <Button
            component={Link}
            href={`${pages.proposal}/${proposal.id}/negociacao/${negotiation.id}`}
            variant="outlined"
            fullWidth
          >
            Ir para negociação
          </Button>
        ) : (
          <Typography color="warning.light" fontWeight="bold" textAlign="center">
            Aguardando resposta da empresa
          </Typography>
        )
      })()}

      <MakeAnOfferDialog />
    </>
  )
}
