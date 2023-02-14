import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'

import { pages } from 'src/constants'
import { useConfirmDialog } from 'src/contexts/confirm-dialog'
import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { useProposalSession, useTab } from 'src/hooks/proposal'

import { ProposalStatus } from 'src/models/enums'
import { ChatMessage, ICTOffer, Offer, Proposal } from 'src/models/types'

import { Chat, ICTOfferSection } from 'src/components/negotiation'
import { OfferHistory } from 'src/components/offer'
import { ActionsHeader, CompanyData, MobileNavigation, TabPanel } from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ChatIcon, DescriptionIcon } from 'src/assets/icons'
import { ProposalTitle, Section, Tab, Tabs, Wrapper } from 'src/styles/proposal'
import { useComponentIsMounted } from 'src/hooks'

type NegotiationPageProps = {
  proposal: Proposal
  offers: Offer[]
  session: Session
  messages: ChatMessage[]
  ictOffer?: ICTOffer
}

const NegotiationPage: NextPage<NegotiationPageProps> = props => {
  const { proposal, offers, messages, session, ictOffer } = props

  const { userIsTheProposalOwner } = useProposalSession(proposal, session)
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const scrollTrigger = useScrollTrigger()
  const { tabs, selectedTab, handleChangeTab, a11yTabProps } = useTab([
    {
      label: 'Conversa',
      icon: ChatIcon,
    },
    {
      label: 'Proposta',
      icon: DescriptionIcon,
    },
  ])
  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { isComponentMounted } = useComponentIsMounted(1500)

  const documentTitle = `Negociação - ${proposal.title} - Connis`

  return (
    <Layout wrapperProps={{ sx: { pb: 10 } }}>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>Oferta</ProposalTitle>
      <Typography component="h2" variant="h3" color="text.secondary" textAlign="center">
        {proposal.title}
      </Typography>

      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
        {tabs.map(({ label }, index) => (
          <Tab key={label} label={label} {...a11yTabProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Wrapper maxWidth="xl">
          <Box component="main" flex={1}>
            {!!ictOffer && (
              <Collapse in={isComponentMounted} timeout={1000}>
                <ICTOfferSection ictOffer={ictOffer} />
              </Collapse>
            )}

            <Section mt={3} sx={{ '&&': { padding: 0 } }}>
              <Typography variant="h3" component="h2" padding={4} pb={0}>
                Chat
              </Typography>
              <Chat messages={messages} />
            </Section>
          </Box>

          <Box component="aside" flex={0.4} position="relative">
            <Section sx={{ position: 'sticky', top: 32 }}>
              {userIsTheProposalOwner && proposal.offerCompany ? (
                <>
                  <CompanyData {...proposal.offerCompany} />

                  <Divider sx={{ mt: 2, mb: 1 }} />

                  <ActionsHeader>
                    <ul>
                      <li>
                        <Typography>
                          &lsquo;Finalizar a negociação&lsquo; significa que você chegou a um acordo com a empresa e a
                          proposta foi resolvida.
                        </Typography>
                      </li>
                      <li>
                        <Typography>
                          &lsquo;Cancelar a negociação&lsquo; significa que você não chegou a um acordo e poderá voltar
                          a avaliar a oferta de outras empresas.
                        </Typography>
                      </li>
                    </ul>
                  </ActionsHeader>

                  <Stack mt={1} gap={1}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleOpenConfirmDialog({
                          title: 'Finalizar negociação',
                          message:
                            'Significa que você chegou a um acordo com a empresa e a proposta foi resolvida. A proposta não poderá ser reaberta.',
                          confirmButton: {
                            onClick: () => {
                              // TODO: Implements the conclude negotiation
                              console.log('Finalizar negociação')
                            },
                          },
                        })
                      }
                      fullWidth
                    >
                      Finalizar negociação
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleOpenConfirmDialog({
                          title: 'Cancelar negociação',
                          message:
                            'Significa que você não chegou a um acordo e poderá voltar a avaliar a oferta de outras empresas.',
                          confirmButton: {
                            onClick: () => {
                              // TODO: Implements the cancel negotiation
                              console.log('Cancelar negociação')
                            },
                          },
                        })
                      }}
                      fullWidth
                    >
                      Cancelar negociação
                    </Button>
                  </Stack>
                </>
              ) : (
                <CompanyData {...proposal.company} />
              )}
            </Section>
          </Box>
        </Wrapper>
      </TabPanel>
      <TabPanel value={selectedTab} index={1} flex={1}>
        <Wrapper maxWidth="xl">
          <OfferHistory proposal={proposal} offers={offers} session={session} />
        </Wrapper>
      </TabPanel>

      <MobileNavigation
        tabs={tabs}
        selectedTab={selectedTab}
        handleChangeTab={handleChangeTab}
        scrollTrigger={scrollTrigger}
      />

      <ScrollTop
        sx={
          isMobile
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

export default NegotiationPage

type Params = {
  id: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(async context => {
  const { myOffers, proposal, messages, ictOffer } = fakeData

  // TODO: Remove fake data
  const { params, session } = context
  const { id } = params as Params

  if (![proposal.company.id, proposal.offerCompany?.id].includes(session?.user.id)) return { notFound: true }
  if (proposal.status !== ProposalStatus.onNegotiation)
    return {
      redirect: {
        destination: `${pages.proposal}/${id}`,
        permanent: false,
      },
    }

  console.log({ id })

  return {
    props: {
      proposal,
      offers: myOffers[0],
      messages,
      ictOffer,
      session,
    },
  }
})
