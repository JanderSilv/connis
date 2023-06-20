import { useSession } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { Box, Collapse, Container, Stack, Typography, useScrollTrigger } from '@mui/material'

import { ProposalType } from 'src/models/enums'
import { ICTHomeProps } from 'src/models/types/home'

import { useTab } from 'src/hooks/proposal'
import { useProposalsFilters } from 'src/hooks/proposals'
import { useNegotiationsFilters } from 'src/hooks/negotiations'

import { MobileNavigation, NegotiationCard, ProposalCard } from 'src/components/proposal'
import { ScrollTop, TabPanel } from 'src/components/shared'
import { MotionGridContainer, MotionGridItem } from 'src/components/motion'
import { Layout } from 'src/layouts/app'

import { ForwardToInboxIcon, HandshakeIcon, LibraryBooksIcon, TipsAndUpdatesOutlinedIcon } from 'src/assets/icons'
import { Title } from 'src/styles/home'
import { Tab, Tabs } from 'src/styles/proposal'
import { Wrapper } from 'src/styles/proposals'

export const ICTHome = (props: Omit<ICTHomeProps, 'userType'>) => {
  const { catalog, negotiations } = props.data

  const scrollTrigger = useScrollTrigger()
  const { data: session } = useSession()

  const { a11yTabProps, handleChangeTab, selectedTab, tabs } = useTab([
    {
      label: 'Negociações',
      icon: HandshakeIcon,
    },
    {
      label: 'Solicitações',
      icon: ForwardToInboxIcon,
    },
    {
      label: 'Oportunidades',
      icon: TipsAndUpdatesOutlinedIcon,
    },
    {
      label: 'Catálogo',
      icon: LibraryBooksIcon,
    },
  ])
  const { filteredNegotiations: negotiationsFilteredProposals } = useNegotiationsFilters(negotiations, {
    defaultParams: {
      iCTInterestedId: session?.user.ictId!,
    },
  })
  const { ProposalsFilters: RequestsProposalsFilters, filteredProposals: requestsFilteredProposals } =
    useProposalsFilters([], {
      organization: 'ict',
      defaultParams: {
        type: [ProposalType.research],
      },
    })
  const {
    filteredNegotiations: opportunitiesFilteredProposals,
    OrderDirectionButton: OpportunitiesOrderDirectionButton,
    isFetching: opportunitiesIsFetching,
  } = useNegotiationsFilters([], {
    defaultParams: {
      onFormalization: true,
    },
  })
  const { ProposalsFilters: CatalogProposalsFilters, filteredProposals: catalogFilteredProposals } =
    useProposalsFilters(catalog, {
      fetchAllTypes: true,
      defaultParams: {
        type: [ProposalType.buyOrSell, ProposalType.donate, ProposalType.exchange],
      },
    })

  const filters = {
    0: null,
    1: <RequestsProposalsFilters />,
    2: null,
    3: <CatalogProposalsFilters />,
  }

  return (
    <Layout>
      <Title sx={{ '&&': { mt: 0 } }}>Seja bem vindo ao Connis.</Title>

      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
        {tabs.map(({ label }, index) => (
          <Tab key={label} label={label} {...a11yTabProps(index)} />
        ))}
      </Tabs>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          {filters[selectedTab as keyof typeof filters]}
        </Box>

        <Container component="main" maxWidth="xl">
          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 0 ? 'negotiations' : 'none'} value={selectedTab} index={0}>
              <MotionGridContainer>
                {negotiationsFilteredProposals.map((negotiation, index) => (
                  <MotionGridItem key={index}>
                    <NegotiationCard negotiation={negotiation} layout="card" unseenActivities={1} />
                  </MotionGridItem>
                ))}
              </MotionGridContainer>
            </TabPanel>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 1 ? 'requests' : 'none'} value={selectedTab} index={1}>
              <MotionGridContainer>
                {requestsFilteredProposals.map(proposal => (
                  <MotionGridItem key={proposal.id}>
                    <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
                  </MotionGridItem>
                ))}
              </MotionGridContainer>
            </TabPanel>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 2 ? 'opportunities' : 'none'} value={selectedTab} index={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                mt={2}
                px={{
                  xs: 2,
                  md: 6,
                }}
                spacing={2}
              >
                <Collapse in={opportunitiesIsFetching}>
                  <Typography variant="body2" color="grey.700">
                    Carregando...
                  </Typography>
                </Collapse>
                <OpportunitiesOrderDirectionButton />
              </Stack>
              <MotionGridContainer>
                {opportunitiesFilteredProposals.map(negotiation => (
                  <MotionGridItem key={negotiation.id}>
                    <NegotiationCard negotiation={negotiation} layout="card" unseenActivities={1} />
                  </MotionGridItem>
                ))}
              </MotionGridContainer>
            </TabPanel>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 3 ? 'catalog' : 'none'} value={selectedTab} index={3}>
              <MotionGridContainer>
                {catalogFilteredProposals.map(proposal => (
                  <MotionGridItem key={proposal.id}>
                    <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
                  </MotionGridItem>
                ))}
              </MotionGridContainer>
            </TabPanel>
          </AnimatePresence>
        </Container>
      </Wrapper>

      <MobileNavigation
        tabs={tabs}
        selectedTab={selectedTab}
        handleChangeTab={handleChangeTab}
        scrollTrigger={scrollTrigger}
      />

      <ScrollTop scrollTrigger={scrollTrigger} hasMobileNavigation />
    </Layout>
  )
}
