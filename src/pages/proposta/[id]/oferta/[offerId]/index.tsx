import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Box, Step, StepButton, StepContent, Stepper, Typography } from '@mui/material'

import { fakeData } from 'src/data/fake'
import { offerCategories } from 'src/data/offer'
import { formatDate } from 'src/helpers/formatters'
import { withAuth } from 'src/helpers/withAuth'
import { useProposalSession } from 'src/hooks/proposal'

import { OfferCategory } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

import { OfferDataSectionOne, OfferDataSectionTwo } from 'src/components/offer'
import { CompanyData, ProposalSections } from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { DescriptionIcon } from 'src/assets/icons'
import { OfferStepIconRoot } from 'src/styles/offer'
import { ProposalTitle, Section, Wrapper } from 'src/styles/proposal'

type OfferPageProps = {
  proposal: Proposal
  offers: Offer[]
}

const OfferPage: NextPage<OfferPageProps> = ({ offers, proposal }) => {
  const { userIsTheOwner, session } = useProposalSession(proposal)

  const [activatedOfferSteps, setActivatedOfferSteps] = useState(() => ({
    ...offers.reduce((acc, offer) => ({ ...acc, [offer.id]: true }), {} as Record<number, boolean>),
  }))
  const [isProposalActive, setIsProposalActive] = useState(true)

  const documentTitle = `Oferta ${proposal.id} - ${proposal.title} - Connis`

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
          <Stepper orientation="vertical" nonLinear>
            {offers.map(offer => (
              <Step key={offer.id} active={activatedOfferSteps[offer.id]} completed={true}>
                <StepButton
                  icon={
                    <OfferStepIcon
                      active={activatedOfferSteps[offer.id]}
                      completed={true}
                      offerCategory={offer.category}
                    />
                  }
                  onClick={() => setActivatedOfferSteps(prev => ({ ...prev, [offer.id]: !prev[offer.id] }))}
                  sx={{ '& .MuiStepLabel-label:is(.Mui-active, .Mui-completed)': { fontWeight: '400' } }}
                >
                  <strong>{session?.user.id === offer.company.id ? 'Você' : offer.company.name}</strong> fez uma{' '}
                  {offerCategories[offer.category].text} {formatDate.distanceToNow(new Date(offer.createdAt))}
                </StepButton>
                <StepContent>
                  <OfferDataSectionOne {...offer} />
                  {offer.category === OfferCategory.counterProposal && (
                    <OfferDataSectionTwo proposal={proposal} currentOffer={offer} offers={offers} />
                  )}
                </StepContent>
              </Step>
            ))}
            <Step active={isProposalActive} completed={true}>
              <StepButton
                icon={
                  <OfferStepIconRoot ownerState={{ completed: true, active: isProposalActive }}>
                    <DescriptionIcon fontSize="small" htmlColor="white" />
                  </OfferStepIconRoot>
                }
                onClick={() => setIsProposalActive(prev => !prev)}
                sx={{ '& .MuiStepLabel-label': { fontWeight: '400' } }}
              >
                Proposta original
              </StepButton>
              <StepContent>
                <ProposalSections proposal={proposal} />
              </StepContent>
            </Step>
          </Stepper>
        </Box>

        <Box component="aside" flex={0.4} position="relative">
          <Section sx={{ mt: 4.6, position: 'sticky', top: 32 }}>
            {userIsTheOwner && proposal.offerCompany ? (
              <CompanyData {...proposal.offerCompany} />
            ) : (
              <CompanyData {...proposal.company} />
            )}
          </Section>
        </Box>
      </Wrapper>

      <ScrollTop />
    </Layout>
  )
}

export default OfferPage

type Params = {
  id: string
  offerId: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(async context => {
  const { myOffers, proposal } = fakeData

  const { params, session } = context
  const { id, offerId } = params as Params

  if (![proposal.company.id, proposal.offerCompany?.id].includes(session?.user.id)) return { notFound: true }

  console.log({ id, offerId })

  return {
    props: {
      proposal,
      offers: myOffers[0],
    },
  }
})

type OfferStepIconProps = {
  offerCategory: OfferCategory
  active: boolean
  completed: boolean
}

const OfferStepIcon = (props: OfferStepIconProps) => {
  const { offerCategory, active, completed } = props

  const Icon = offerCategories[offerCategory].icon

  return (
    <OfferStepIconRoot ownerState={{ completed, active }}>
      <Icon fontSize="small" htmlColor="white" />
    </OfferStepIconRoot>
  )
}
