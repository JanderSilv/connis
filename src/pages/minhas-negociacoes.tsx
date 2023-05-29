import { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import useSWR from 'swr'

import { Negotiation } from 'src/models/types'

import { withAuth } from 'src/helpers/withAuth'

import { NegotiationCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'
import { proposalService } from 'src/services'

type Props = {
  initialNegotiations: Negotiation[]
}

const MyNegotiations: NextPage<Props> = ({ initialNegotiations }) => {
  const { data: negotiations } = useSWR('negotiations', proposalService.getNegotiationsFetcher, {
    fallbackData: initialNegotiations,
  })

  return (
    <Layout documentTitle="Minhas Negociações">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Minhas Negociações
      </Typography>

      <Wrapper>
        <Grid container spacing={2}>
          {negotiations.map(negotiations => (
            <Grid key={negotiations.id} item sm={6} lg={4} xl={3}>
              <NegotiationCard key={negotiations.id} negotiation={negotiations} unseenActivities={1} layout="card" />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </Layout>
  )
}

export default MyNegotiations

export const getServerSideProps = withAuth(async () => {
  const { data: negotiations } = await proposalService.getCompanyNegotiations()

  return {
    props: {
      initialNegotiations: negotiations,
    },
  }
})
