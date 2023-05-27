import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import { useConfirmDialog } from 'src/contexts/confirm-dialog'
import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { useOfferSession } from 'src/hooks/offer'
import { useProposalSession } from 'src/hooks/proposal'

import { Offer, Proposal } from 'src/models/types'

import { OfferHistory } from 'src/components/offer'
import { ActionsHeader, CompanyData } from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ProposalTitle, Section, Wrapper } from 'src/styles/proposal'

type OfferPageProps = {
  proposal: Proposal
  offers: Offer[]
  session: Session
}

const OfferPage: NextPage<OfferPageProps> = ({ offers, proposal, session }) => {
  const currentOffer = offers.at(-1)

  const { userIsTheProposalOwner } = useProposalSession(proposal, session)
  const { userIsTheOfferOwner } = useOfferSession(currentOffer, session)
  const { handleOpenConfirmDialog } = useConfirmDialog()

  const documentTitle = `Oferta ${proposal.id} - ${proposal.title} - Connis`

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>Oferta</ProposalTitle>
      <Typography component="h2" variant="h3" color="text.secondary" textAlign="center">
        {proposal.title}
      </Typography>

      <Wrapper maxWidth="xl">
        <Box component="main" flex={1}>
          <OfferHistory proposal={proposal} offers={offers} session={session} />
        </Box>

        <Box component="aside" flex={0.4} position="relative">
          <Section sx={{ mt: 6, position: 'sticky', top: 32 }}>
            {userIsTheProposalOwner && proposal.offerCompany ? (
              <CompanyData {...proposal.offerCompany} />
            ) : (
              <CompanyData {...(proposal as any).company} />
            )}
            {!!currentOffer && (
              <>
                <Divider sx={{ mt: 2, mb: 1 }} />
                {userIsTheOfferOwner ? (
                  <Typography color="warning.light" fontWeight="bold" textAlign="center">
                    Aguardando resposta da empresa
                  </Typography>
                ) : (
                  <>
                    <ActionsHeader>
                      <ul>
                        <li>
                          <Typography>
                            {userIsTheProposalOwner
                              ? 'Iniciar a negociação significa que você concorda com os termos atuais da proposta, além de impedir que você siga com outras ofertas.'
                              : 'Aceitar a oferta significa que você concorda com os termos atuais da proposta e irá aguardar a resposta da empresa para dar início a negociação.'}
                          </Typography>
                        </li>
                        <li>
                          <Typography>Fazer uma contra proposta serve para alterar pontos da proposta.</Typography>
                        </li>
                        <li>
                          <Typography>Recusar a oferta significa não seguir em negociação com esta empresa.</Typography>
                        </li>
                      </ul>
                    </ActionsHeader>

                    <Stack mt={1} gap={1}>
                      {userIsTheProposalOwner ? (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleOpenConfirmDialog({
                              title: 'Iniciar negociação',
                              message:
                                'Iniciar a negociação significa que você concorda com os termos atuais da proposta, além de impedir que você siga com outras ofertas.',
                              confirmButton: {
                                onClick: () => {
                                  // TODO: Implements the start negotiation
                                  console.log('Iniciar negociação')
                                },
                              },
                            })
                          }}
                          fullWidth
                        >
                          Iniciar Negociação
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleOpenConfirmDialog({
                              title: 'Aceitar oferta',
                              message:
                                'Aceitar a oferta significa que você concorda com os termos atuais da proposta e irá aguardar a resposta da empresa para dar início a negociação.',
                              confirmButton: {
                                onClick: () => {
                                  // TODO: Implements the accept offer
                                  console.log('Aceitar oferta')
                                },
                              },
                            })
                          }}
                          fullWidth
                        >
                          Aceitar Oferta
                        </Button>
                      )}
                      <Button variant="contained" color="warning" fullWidth>
                        Fazer Contra Proposta
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleOpenConfirmDialog({
                            title: 'Recusar oferta',
                            message: 'Recusar a oferta significa não seguir em negociação com esta empresa.',
                            confirmButton: {
                              onClick: () => {
                                // TODO: Implements the reject offer
                                console.log('Recusar oferta')
                              },
                            },
                          })
                        }}
                        fullWidth
                      >
                        Recusar Oferta
                      </Button>
                    </Stack>
                  </>
                )}
              </>
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

  // TODO: Remove fake data

  const { params, session } = context
  const { id, offerId } = params as Params

  // if (![proposal.company.id, proposal.offerCompany?.id].includes(session?.user.id)) return { notFound: true }

  console.log({ id, offerId })

  return {
    props: {
      proposal,
      offers: myOffers[0],
      session,
    },
  }
})
