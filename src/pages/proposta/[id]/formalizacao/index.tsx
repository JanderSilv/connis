import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
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

import { OrderDirection, ProposalStatus } from 'src/models/enums'
import { ChatMessage, ICTOffer, HttpResponseError, Negotiation } from 'src/models/types'

import { pages } from 'src/constants'
import { useConfirmDialog } from 'src/contexts/confirm-dialog'
import { fakeData } from 'src/data/fake'
import { toastHttpError } from 'src/helpers/shared'
import { withAuth } from 'src/helpers/withAuth'
import { useComponentIsMounted } from 'src/hooks'
import { useProposalSession, useTab } from 'src/hooks/proposal'
import { companyService, offerService, proposalService } from 'src/services'

import { Chat, ICTOfferSection } from 'src/components/negotiation'
import { OfferHistory } from 'src/components/offer'
import { ActionsHeader, CompanyData, MobileNavigation } from 'src/components/proposal'
import { ScrollTop, TabPanel } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ChatIcon, DescriptionIcon } from 'src/assets/icons'
import { ProposalTitle, Section, Tab, Tabs, Wrapper } from 'src/styles/proposal'

type NegotiationPageProps = {
  negotiation: Negotiation
  session: Session
  messages: ChatMessage[]
  ictOffer?: ICTOffer
}

const NegotiationPage: NextPage<NegotiationPageProps> = props => {
  const { negotiation, messages, session, ictOffer } = props
  const { proposal, offers } = negotiation

  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const scrollTrigger = useScrollTrigger()
  const { replace } = useRouter()
  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { isComponentMounted } = useComponentIsMounted(1500)
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

  const { userIsTheProposalOwner } = useProposalSession(proposal, session)

  return (
    <Layout wrapperProps={{ sx: { pb: 10 } }} documentTitle={`Negociação - ${proposal.title}`}>
      <ProposalTitle>Formalização</ProposalTitle>
      <Typography component="h2" variant="h3" color="text.secondary" textAlign="center">
        {proposal.title}
      </Typography>

      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
        {tabs.map(({ label }, index) => (
          <Tab key={label} label={label} {...a11yTabProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={selectedTab} index={0} withGrowAnimation>
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
              <Chat messages={messages} user={session.user} />
            </Section>
          </Box>

          <Box component="aside" flex={0.4} position="relative">
            <Section sx={{ position: 'sticky', top: 32 }}>
              {userIsTheProposalOwner && !!negotiation.companyInterested ? (
                <>
                  <CompanyData type="company" {...negotiation.companyInterested} />

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
                            onClick: async () => {
                              try {
                                await proposalService.rejectNegotiation(proposal.id)
                                replace(`${pages.proposal}/${proposal.id}`)
                              } catch (error) {
                                toastHttpError(error)
                              }
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
                <CompanyData type="company" {...negotiation.companyProponent} />
              )}
            </Section>
          </Box>
        </Wrapper>
      </TabPanel>

      <TabPanel value={selectedTab} index={1} flex={1} withGrowAnimation>
        <Wrapper maxWidth="xl">
          <OfferHistory proposal={proposal} offers={offers} user={session.user} />
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
}

export const getServerSideProps = withAuth(async context => {
  const { messages, ictOffer } = fakeData
  const { params, session } = context
  const { id } = params as Params

  try {
    const { data: negotiation } = await proposalService.getAcceptedNegotiation(id)
    const { data: offersData } = await offerService.getCompanyOffers({
      negotiationId: negotiation.id,
      orderBy: 'createdAt',
      orderDirection: OrderDirection.Desc,
    })
    const { data: companyProponent } = await companyService.get(negotiation.companyProponent.id)
    const { data: companyInterested } = await companyService.get(negotiation.companyInterested.id)

    if (
      session?.user.companyId &&
      ![negotiation.companyProponent.id, negotiation.companyInterested?.id].includes(session?.user.companyId)
    )
      return { notFound: true }
    if (negotiation.proposal.status !== ProposalStatus.onFormalization)
      return {
        redirect: {
          destination: `${pages.proposal}/${id}`,
          permanent: false,
        },
      }

    return {
      props: {
        negotiation: {
          ...negotiation,
          offers: offersData.offers,
          companyProponent,
          companyInterested,
        },
        messages,
        ictOffer,
        session,
      },
    }
  } catch (err) {
    const error = err as HttpResponseError
    if (error.response?.status === 400) return { notFound: true }
    throw err
  }
})
