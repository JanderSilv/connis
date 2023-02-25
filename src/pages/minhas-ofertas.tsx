import { NextPage } from 'next'
import { Box, Container, Grid, Typography } from '@mui/material'

import { Offer } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { useOffersFilters } from 'src/hooks/offers'

import { OfferCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  offers: Offer[]
}

const MyOffers: NextPage<Props> = ({ offers }) => {
  const { filteredOffers, OffersFilters } = useOffersFilters(offers)

  return (
    <Layout documentTitle="Minhas Ofertas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Minhas Ofertas
      </Typography>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <OffersFilters />
        </Box>

        <Container component="main" maxWidth="xl">
          <Grid container spacing={2}>
            {filteredOffers.map(offer => (
              <Grid key={offer.id} item sm={6} lg={4} xl={3}>
                <OfferCard key={offer.id} offer={offer} unseenActivities={offer.viewed ? 1 : 0} layout="card" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default MyOffers

export const getServerSideProps = withAuth(async () => {
  // TODO: fetch my offers from API
  const { recentOffers } = fakeData

  return {
    props: {
      offers: recentOffers,
    },
  }
})
