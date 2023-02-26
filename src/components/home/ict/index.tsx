import { motion, AnimatePresence } from 'framer-motion'
import { Box, Container, Grid, useScrollTrigger } from '@mui/material'

import { ICTHomeProps } from 'src/models/types/home'

import { useTab } from 'src/hooks/proposal'
import { useProposalsFilters } from 'src/hooks/proposals'

import { MobileNavigation, ProposalCard } from 'src/components/proposal'
import { ScrollTop, TabPanel } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ForwardToInboxIcon, HandshakeIcon, TipsAndUpdatesOutlinedIcon } from 'src/assets/icons'
import { Title } from 'src/styles/home'
import { Tab, Tabs } from 'src/styles/proposal'
import { Wrapper } from 'src/styles/proposals'

export const ICTHome = (props: Omit<ICTHomeProps, 'userType'>) => {
  const { negotiations, opportunities, requests } = props

  const scrollTrigger = useScrollTrigger()

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
  ])
  const { ProposalsFilters: NegotiationsProposalsFilters, filteredProposals: negotiationsFilteredProposals } =
    useProposalsFilters(negotiations)
  const { ProposalsFilters: RequestsProposalsFilters, filteredProposals: requestsFilteredProposals } =
    useProposalsFilters(requests)
  const { ProposalsFilters: OpportunitiesProposalsFilters, filteredProposals: opportunitiesFilteredProposals } =
    useProposalsFilters(opportunities)

  const filters = {
    0: <NegotiationsProposalsFilters />,
    1: <RequestsProposalsFilters />,
    2: <OpportunitiesProposalsFilters />,
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
              <MotionGrid
                container
                spacing={2}
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {negotiationsFilteredProposals.map((proposal, index) => (
                  <MotionGrid key={index} item sm={6} lg={4} xl={3} variants={itemAnimation}>
                    <ProposalCard proposal={proposal} layout="card" />
                  </MotionGrid>
                ))}
              </MotionGrid>
            </TabPanel>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 1 ? 'requests' : 'none'} value={selectedTab} index={1}>
              <MotionGrid
                container
                spacing={2}
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {requestsFilteredProposals.map(proposal => (
                  <MotionGrid key={proposal.id} item sm={6} lg={4} xl={3} variants={itemAnimation}>
                    <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
                  </MotionGrid>
                ))}
              </MotionGrid>
            </TabPanel>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabPanel key={selectedTab === 2 ? 'opportunities' : 'none'} value={selectedTab} index={2}>
              <MotionGrid
                container
                spacing={2}
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {opportunitiesFilteredProposals.map(proposal => (
                  <MotionGrid key={proposal.id} item sm={6} lg={4} xl={3} variants={itemAnimation}>
                    <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
                  </MotionGrid>
                ))}
              </MotionGrid>
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

const MotionGrid = motion(Grid)

const containerAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
}
const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}
