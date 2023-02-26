import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Box, Theme, useMediaQuery, useScrollTrigger } from '@mui/material'

import { fakeData } from 'src/data/fake'
import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'
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
  ProposalSections,
} from 'src/components/proposal'
import { ScrollTop, TabPanel } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { BusinessIcon, DescriptionIcon } from 'src/assets/icons'
import { ProposalTitle, Section, Tab, Tabs, Wrapper } from 'src/styles/proposal'

type ProposalPageProps = {
  proposal: Proposal
  offers: Offer[][]
}

const ProposalPage: NextPage<ProposalPageProps> = props => {
  const { proposal, offers } = props
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const scrollTrigger = useScrollTrigger()
  const { userIsTheProposalOwner, status, session } = useProposalSession(proposal)
  const { tabs, selectedTab, handleChangeTab, a11yTabProps } = useTab([
    {
      label: 'Proposta',
      icon: DescriptionIcon,
    },
    {
      label: 'Empresas Interessadas',
      icon: BusinessIcon,
    },
  ])

  const documentTitle = `Proposta ${proposal.id} - Connis`

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>{proposal.title}</ProposalTitle>

      {userIsTheProposalOwner && (
        <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
          {tabs.map(({ label }, index) => (
            <Tab key={label} label={label} {...a11yTabProps(index)} />
          ))}
        </Tabs>
      )}

      <Wrapper maxWidth="xl">
        <TabPanel value={selectedTab} index={0} flex={1} withGrowAnimation>
          <ProposalSections proposal={proposal} />
        </TabPanel>
        {userIsTheProposalOwner && (
          <TabPanel value={selectedTab} index={1} flex={1} withGrowAnimation>
            <Box component="main" maxWidth={750} ml="auto">
              {offers.map(offerHistory => {
                const lastOffer = offerHistory.at(-1)
                return (
                  lastOffer && (
                    <OfferCard
                      key={lastOffer.id}
                      offer={lastOffer}
                      href={`/proposta/${lastOffer.proposalId}/oferta/${lastOffer.id}`}
                      unseenActivities={lastOffer.viewed ? 0 : 1}
                    />
                  )
                )
              })}
            </Box>
          </TabPanel>
        )}

        <Box component="aside" flex={userIsTheProposalOwner ? 0.3 : 0.4} position="relative">
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
              else if (userIsTheProposalOwner) return <AsideContentOwner {...proposal} />
              else if (session?.user && checkUserIsCompany(session.user))
                return <OfferCompanyAsideContent proposal={proposal} />
              else return <CompanyData {...proposal.company} />
            })()}
          </Section>
        </Box>
      </Wrapper>

      {userIsTheProposalOwner && (
        <MobileNavigation
          tabs={tabs}
          selectedTab={selectedTab}
          handleChangeTab={handleChangeTab}
          scrollTrigger={scrollTrigger}
        />
      )}

      <ScrollTop
        sx={
          userIsTheProposalOwner && isMobile
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
