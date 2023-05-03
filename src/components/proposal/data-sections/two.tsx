import { Box, Divider, Stack, Typography } from '@mui/material'

import { proposalTypeOptions } from 'src/data/proposal'
import { makeProposalTypeText } from 'src/helpers/proposal'
import { ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { ProposalTypeData } from '../proposal-type-data'
import { TRLData } from '../trl-data'

import { DoubleArrowIcon } from 'src/assets/icons'
import { DataContainer, Section, Title } from 'src/styles/proposal'

type Props = Proposal

export const ProposalDataSectionTwo = (props: Props) => {
  const { budget, goalTrl, trl, proposalType } = props

  return (
    <Section sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
      <Box flex={1}>
        <Title>TRLs</Title>

        <Typography>
          A empresa identifica que a proposta se encaixa na <strong>TRL {trl}</strong> e espera auxílio para atingir a{' '}
          <strong>TRL {goalTrl}</strong>.
        </Typography>

        <Stack mt={3} direction="row" alignItems="center" gap={1}>
          <TRLData trl={trl} />
          <DoubleArrowIcon fontSize="large" color="primary" />
          <TRLData trl={goalTrl} />
        </Stack>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'flex' } }} />

      <Box flex={1}>
        {!!budget && (
          <Box>
            <Title>
              {proposalType?.includes(ProposalType.buyOrSell) ? 'Valor Solicitado' : 'Valor Disponível para Investir'}
            </Title>
            <Typography>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(budget)}
            </Typography>
          </Box>
        )}

        <DataContainer>
          <Title>Tipo da Proposta</Title>
          <Typography>{makeProposalTypeText(proposalType)}</Typography>
          <Stack mt={3} direction="row" alignItems="center" gap={1}>
            {proposalTypeOptions.map(type => (
              <ProposalTypeData key={type.id} {...type} selected={proposalType.includes(type.id)} />
            ))}
          </Stack>
        </DataContainer>
      </Box>
    </Section>
  )
}
