import { Box, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { useProposalSession } from 'src/hooks/proposal'

import { Offer } from 'src/models/types'

import { OfferDataSectionOne, OfferDataSectionTwo } from 'src/components/offer'
import { CompanyData } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'
import { ProposalTitle, Section, Wrapper } from 'src/styles/proposal'

type OfferPageProps = {
  offers: Offer[]
}

const OfferPage: NextPage<OfferPageProps> = ({ offers }) => {
  const currentOffer = offers.at(-1)!

  const { userIsTheOwner } = useProposalSession(currentOffer.proposal!)

  const { proposal, proposalId } = currentOffer

  if (!proposal) return null

  const documentTitle = `Oferta ${proposalId} - Connis`

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>Oferta</ProposalTitle>
      {userIsTheOwner && (
        <Typography component="h2" variant="h3" color="text.secondary" textAlign="center">
          {proposal.title}
        </Typography>
      )}

      <Wrapper maxWidth="xl">
        <Box component="main" flex={1}>
          <OfferDataSectionOne {...currentOffer} />
          <OfferDataSectionTwo currentOffer={currentOffer} offers={offers} />
        </Box>

        <Box component="aside" flex={0.4} position="relative">
          <Section sx={{ position: 'sticky', top: 32 }}>
            {userIsTheOwner && proposal.offerCompany ? (
              <CompanyData {...proposal.offerCompany} />
            ) : (
              <CompanyData {...proposal.company} />
            )}
          </Section>
        </Box>
      </Wrapper>
    </Layout>
  )
}

export default OfferPage

type Params = {
  id: string
  offerId: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(async context => {
  const { myOffers } = fakeData

  const { id, offerId } = context.params as Params

  console.log({ id, offerId })

  return {
    props: {
      offers: myOffers[0],
    },
  }
})
