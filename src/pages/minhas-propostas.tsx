import { NextPage } from 'next'
import { Box, Container, Grid, Typography } from '@mui/material'

import { Proposal } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { useProposalsFilters } from 'src/hooks/proposals'

import { ProposalCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  proposals: Proposal[]
}

const MyProposals: NextPage<Props> = ({ proposals }) => {
  const { filteredProposals, ProposalsFilters } = useProposalsFilters(proposals)

  return (
    <Layout documentTitle="Minhas Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Minhas Propostas
      </Typography>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <ProposalsFilters />
        </Box>

        <Container component="main" maxWidth="xl">
          <Grid container spacing={2}>
            {filteredProposals.map(proposal => (
              <Grid key={proposal.id} item sm={6} lg={4} xl={3}>
                <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default MyProposals

export const getServerSideProps = withAuth(async () => {
  // TODO: fetch proposals from API
  const { myProposals } = fakeData

  return {
    props: {
      proposals: myProposals,
    },
  }
})
