import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Box, Theme, useMediaQuery, useScrollTrigger } from '@mui/material'

import { fakeData } from 'src/data/fake'
import { checkUserIsICT } from 'src/helpers/users'
import { useProposalSession, useTab } from 'src/hooks/proposal'

import { ProposalType } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

import {
  AsideContentOwner,
  CompanyData,
  DefaultAsideContent,
  ICTAsideContent,
  MobileNavigation,
  OfferCard,
  OfferCompanyAsideContent,
  ProposalDataSectionOne,
  ProposalDataSectionThree,
  ProposalDataSectionTwo,
  TabPanel,
} from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { Layout } from 'src/layouts/app'
import { ProposalTitle, Section, Tab, Tabs, Wrapper } from 'src/styles/proposal'

type ProposalSectionsProps = {
  proposal: Proposal
}

const ProposalSections = ({ proposal }: ProposalSectionsProps) => (
  <Box component="main">
    <ProposalDataSectionOne {...proposal} />
    <ProposalDataSectionTwo {...proposal} />
    <ProposalDataSectionThree {...proposal} />
  </Box>
)

type ProposalPageProps = {
  proposal: Proposal
  offers: Offer[][]
}

const ProposalPage: NextPage<ProposalPageProps> = props => {
  const { proposal, offers } = props
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const scrollTrigger = useScrollTrigger()
  const { userIsTheOwner, status, session } = useProposalSession(proposal)
  const { tabs, selectedTab, handleChangeTab, a11yTabProps } = useTab()

  const documentTitle = `Proposta ${proposal.id} - Connis`

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>{proposal.title}</ProposalTitle>

      {userIsTheOwner && (
        <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
          {tabs.map(({ label }, index) => (
            <Tab key={label} label={label} {...a11yTabProps(index)} />
          ))}
        </Tabs>
      )}

      <Wrapper maxWidth="xl">
        <TabPanel value={selectedTab} index={0} flex={1}>
          <ProposalSections proposal={proposal} />
        </TabPanel>
        {userIsTheOwner && (
          <TabPanel value={selectedTab} index={1} flex={1}>
            <Box component="main" maxWidth={750} ml="auto">
              {offers.map(offerHistory => {
                const lastOffer = offerHistory.at(-1)
                return (
                  lastOffer && (
                    <OfferCard
                      key={lastOffer.id}
                      {...lastOffer}
                      href={`/proposta/${lastOffer.proposal?.id}/oferta/${lastOffer.id}`}
                      unseenActivities={lastOffer.viewed ? 0 : 1}
                    />
                  )
                )
              })}
            </Box>
          </TabPanel>
        )}

        <Box component="aside" flex={userIsTheOwner ? 0.3 : 0.4} position="relative">
          <Section sx={{ position: 'sticky', top: 32 }}>
            {(() => {
              if (status === 'loading') return <CompanyData {...proposal.company} />
              else if (status === 'unauthenticated') return <DefaultAsideContent {...proposal.company} />
              else if (
                proposal.proposalType.includes(ProposalType.research) &&
                session?.user &&
                checkUserIsICT(session.user)
              )
                return <ICTAsideContent {...proposal.company} />
              else if (userIsTheOwner) return <AsideContentOwner {...proposal} />
              else return <OfferCompanyAsideContent {...proposal.company} />
            })()}
          </Section>
        </Box>
      </Wrapper>

      {userIsTheOwner && (
        <MobileNavigation
          tabs={tabs}
          selectedTab={selectedTab}
          handleChangeTab={handleChangeTab}
          scrollTrigger={scrollTrigger}
        />
      )}

      <ScrollTop
        sx={
          userIsTheOwner && isMobile
            ? {
                bottom: 70,
                transform: scrollTrigger ? 'translateY(50px)' : 'translateY(0)',
              }
            : {}
        }
      />
    </Layout>
  )
}

export default ProposalPage

type Params = {
  id: string
} & ParsedUrlQuery

export const getStaticPaths = async () => {
  const { myProposals } = fakeData

  const paths = myProposals.map(proposal => ({
    params: {
      id: proposal.id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { proposal, myOffers } = fakeData

  const { id } = context.params as Params

  console.log({ id })

  return {
    props: {
      proposal,
      offers: myOffers,
    },
  }
}
