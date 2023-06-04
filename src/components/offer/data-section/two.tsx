import { Box, Divider, Stack, Typography } from '@mui/material'

import { makeTRLText, makeProposalTypeText, makeProposalBudgetText } from './helpers'
import { formatCurrency } from 'src/helpers/formatters'
import { useOfferSession } from 'src/hooks/offer'

import { proposalTypeOptions } from 'src/data/proposal'
import { ProposalType } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

import { ProposalTypeData, TRLData } from 'src/components/proposal'

import { DoubleArrowIcon } from 'src/assets/icons'
import { DataContainer, Section, Title } from 'src/styles/proposal'

type Props = {
  proposal: Proposal
  currentOffer: Offer
  offers: Offer[]
}

export const OfferDataSectionTwo = ({ currentOffer, offers, proposal }: Props) => {
  const { suggestion, proposalType } = currentOffer
  const { trl, goalTrl, budget } = suggestion

  const { userIsTheOfferOwner } = useOfferSession(currentOffer)

  if (!proposal) return null

  return (
    <Section sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
      <Box flex={1}>
        <Title>TRLs</Title>

        <Typography>{makeTRLText({ offer: currentOffer, offers, proposal }, userIsTheOfferOwner)}</Typography>
        {!!trl && !!goalTrl && (
          <Stack mt={3} direction="row" alignItems="center" gap={1}>
            <TRLData trl={trl} />
            <DoubleArrowIcon fontSize="large" color="primary" />
            <TRLData trl={goalTrl} />
          </Stack>
        )}
      </Box>

      {[ProposalType.buyOrSell, ProposalType.research].includes(proposalType) && (
        <>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'flex' } }} />

          <Box flex={1}>
            {!!budget && (
              <Box>
                <Title>
                  {proposal.types?.includes(ProposalType.buyOrSell)
                    ? 'Valor Solicitado'
                    : 'Valor Disponível para Investir'}
                </Title>
                <Typography>
                  {makeProposalBudgetText(proposal, currentOffer, offers, userIsTheOfferOwner)}{' '}
                  <span>{formatCurrency(budget)}</span>{' '}
                </Typography>
              </Box>
            )}

            <DataContainer>
              <Title>Tipo da Proposta</Title>
              <Typography>{makeProposalTypeText(proposalType, userIsTheOfferOwner)}</Typography>
              <Stack mt={3} direction="row" alignItems="center" gap={1}>
                {proposalTypeOptions.map(proposalTypeOption => (
                  <ProposalTypeData
                    key={proposalTypeOption.id}
                    {...proposalTypeOption}
                    selected={proposalTypeOption.id === proposalType}
                  />
                ))}
              </Stack>
            </DataContainer>
          </Box>
        </>
      )}
    </Section>
  )
}
