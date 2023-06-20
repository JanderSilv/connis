import { GetStaticProps, NextPage } from 'next'
import useSWR, { SWRConfig } from 'swr'
import { ParsedUrlQuery } from 'querystring'
import { Box, Theme, Typography, useMediaQuery, useScrollTrigger } from '@mui/material'

import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'
import { useProposal, useProposalSession, useTab } from 'src/hooks/proposal'
import { proposalService } from 'src/services/proposal'

import { ProposalStatus, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import {
  AsideContentOwner,
  CompanyData,
  DefaultAsideContent,
  ICTAsideContent,
  MobileNavigation,
  NegotiationCard,
  OfferCompanyAsideContent,
  ProposalCard,
  ProposalSections,
} from 'src/components/proposal'
import { ScrollTop, TabPanel } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { BusinessIcon, DescriptionIcon, LibraryBooksIcon } from 'src/assets/icons'
import { ProposalTitle, Section, Tab, Tabs, Wrapper } from 'src/styles/proposal'
import { pages } from 'src/constants'

type ProposalPageProps = {
  initialProposal: Proposal
}

const ProposalPage: NextPage<ProposalPageProps> = props => {
  const { initialProposal } = props

  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const scrollTrigger = useScrollTrigger()
  const { tabs, selectedTab, handleChangeTab, a11yTabProps } = useTab([
    {
      label: 'Proposta',
      icon: DescriptionIcon,
    },
    {
      label: 'Empresas Interessadas',
      icon: BusinessIcon,
    },
    ...(!initialProposal.types.includes(ProposalType.research)
      ? [
          {
            label: 'Propostas Similares',
            icon: LibraryBooksIcon,
          },
        ]
      : []),
  ])

  const { userIsTheProposalOwner, status, session } = useProposalSession(initialProposal)
  const { negotiations, similarProposals } = useProposal(initialProposal.id, userIsTheProposalOwner)

  const getProposalUrl = `${proposalService.baseUrl}/${initialProposal.id}`
  const { data: proposal } = useSWR(getProposalUrl, proposalService.getFetcher, {
    fallbackData: initialProposal,
    revalidateOnFocus: false,
  })

  return (
    <Layout documentTitle={`Proposta ${proposal.id}`}>
      <SWRConfig
        value={{
          fallback: {
            [getProposalUrl]: initialProposal,
          },
        }}
      >
        <ProposalTitle>{proposal.title}</ProposalTitle>

        {userIsTheProposalOwner && proposal.status !== ProposalStatus.onFormalization && (
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
                {!!negotiations?.length ? (
                  negotiations.map(negotiation => (
                    <NegotiationCard
                      key={negotiation.id}
                      negotiation={negotiation}
                      href={`${pages.proposal}/${proposal.id}${pages.negotiation}/${negotiation.id}`}
                      unseenActivities={1}
                      hideTitle
                    />
                  ))
                ) : (
                  <Typography alignItems="center">
                    Nenhuma empresa demonstrou interesse na sua proposta até o momento.
                  </Typography>
                )}
              </Box>
            </TabPanel>
          )}
          {userIsTheProposalOwner && !proposal.types.includes(ProposalType.research) && (
            <TabPanel value={selectedTab} index={2} flex={1} withGrowAnimation>
              <Box component="main" maxWidth={750} ml="auto">
                {!!similarProposals?.length ? (
                  similarProposals.map(similarProposal => (
                    <ProposalCard key={similarProposal.id} proposal={similarProposal} />
                  ))
                ) : (
                  <Typography alignItems="center">Nenhuma proposta similar foi encontrada.</Typography>
                )}
              </Box>
            </TabPanel>
          )}

          <Box component="aside" flex={userIsTheProposalOwner ? 0.3 : 0.4} position="relative">
            <Section sx={{ position: 'sticky', top: 32 }}>
              {(() => {
                if (status === 'loading') return <CompanyData type="company" {...proposal.company} />
                else if (status === 'unauthenticated') return <DefaultAsideContent {...proposal.company} />
                else if (checkUserIsICT(session?.user) && proposal.types.includes(ProposalType.research))
                  return <ICTAsideContent {...proposal.company} />
                else if (userIsTheProposalOwner)
                  return <AsideContentOwner {...proposal} hasOffers={!!negotiations?.length} />
                else if (checkUserIsCompany(session?.user) && !proposal.types.includes(ProposalType.research))
                  return <OfferCompanyAsideContent proposal={proposal} />
                else return <CompanyData type="company" {...proposal.company} />
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
      </SWRConfig>
    </Layout>
  )
}

export default ProposalPage

type Params = {
  id: string
} & ParsedUrlQuery

export const getStaticPaths = async () => {
  const { data: proposals } = await proposalService.list({
    pageSize: 12,
  })

  const paths = proposals
    .filter(proposal => (proposal.trl as number) !== 0 && (proposal.goalTrl as number) !== 0)
    .map(proposal => ({
      params: {
        id: proposal.id.toString(),
      },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as Params

  try {
    const { data: proposal } = await proposalService.get(id)

    return {
      props: {
        initialProposal: proposal,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
