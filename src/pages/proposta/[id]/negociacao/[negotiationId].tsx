import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import { pages } from 'src/constants'
import { useLoadingBackdrop } from 'src/contexts'
import { useConfirmDialog } from 'src/contexts/confirm-dialog'
import { toastHttpError } from 'src/helpers/shared'
import { checkUserIsICT } from 'src/helpers/users'
import { withAuth } from 'src/helpers/withAuth'
import { useToast } from 'src/hooks'
import { useMakeAnOffer, useProposalSession } from 'src/hooks/proposal'
import { negotiationService, offerService, proposalService } from 'src/services'

import { OfferCategory, OrderDirection, ProposalStatus } from 'src/models/enums'
import { Negotiation, Offer } from 'src/models/types'

import { OfferHistory } from 'src/components/offer'
import { ActionsHeader, CompanyData } from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { Layout } from 'src/layouts/app'

import { ProposalTitle, Section, Wrapper } from 'src/styles/proposal'

type NegotiationPageProps = {
  negotiation: Negotiation
  offers: Offer[]
  session: Session
}

const NegotiationPage: NextPage<NegotiationPageProps> = props => {
  const { negotiation: initialNegotiation, offers: initialOffers, session } = props

  const { push, replace } = useRouter()
  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { toggleLoading } = useLoadingBackdrop()
  const { showToast } = useToast()

  const { data: negotiation } = useSWRImmutable(
    `${proposalService.baseUrl}/${initialNegotiation.proposal.id}/negotiations/${initialNegotiation.id}`,
    negotiationService.getFetcher,
    {
      fallbackData: initialNegotiation,
    }
  )
  const { data: offers, mutate } = useSWR(
    [
      `${offerService.companyBaseUrl}`,
      { negotiationId: negotiation.id, orderBy: 'createdAt', orderDirection: OrderDirection.Desc },
    ],
    offerService.getCompanyOffersFetcher,
    {
      fallbackData: initialOffers,
      revalidateIfStale: false,
    }
  )

  const { proposal, companyInterested, companyProponent } = negotiation

  const { userIsTheProposalOwner } = useProposalSession(proposal, session)
  const { MakeAnOfferDialog, handleOpenMakeAnOfferDialog } = useMakeAnOffer(proposal, offers)
  const currentOffer = offers[0]

  return (
    <Layout documentTitle={`Negociação - ${proposal.title} - ${negotiation.id}`}>
      <ProposalTitle>Negociação</ProposalTitle>
      <Typography component="h2" variant="h3" color="text.secondary" textAlign="center">
        {proposal.title}
      </Typography>

      <Wrapper maxWidth="xl">
        <Box component="main" flex={1}>
          <OfferHistory proposal={proposal} offers={offers} user={session.user} />
        </Box>

        <Box component="aside" flex={0.4} position="relative">
          <Section sx={{ mt: 6, position: 'sticky', top: 32 }}>
            {userIsTheProposalOwner ? (
              <CompanyData type="company" {...companyInterested} />
            ) : (
              <CompanyData type="company" {...companyProponent} />
            )}
            {!!currentOffer && (
              <>
                <Divider sx={{ mt: 2, mb: 1 }} />
                {currentOffer.company.id !== session.user.companyId ? (
                  <>
                    <ActionsHeader>
                      <ul>
                        <li>
                          <Typography>
                            {userIsTheProposalOwner
                              ? 'Formalizar a negociação significa concordar com os termos atuais da proposta e seguir negociação com esta empresa.'
                              : 'Aceitar a oferta significa que você concorda com os termos atuais da proposta e irá aguardar a resposta da empresa para dar início a negociação.'}
                          </Typography>
                        </li>
                        <li>
                          <Typography>Fazer uma contra proposta serve para alterar pontos da proposta.</Typography>
                        </li>
                        {/* <li>
                          <Typography>Recusar a oferta significa não seguir em negociação com esta empresa.</Typography>
                        </li> */}
                      </ul>
                    </ActionsHeader>

                    <Stack mt={1} gap={1}>
                      {userIsTheProposalOwner ? (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleOpenConfirmDialog({
                              title: 'Formalizar Negociação',
                              message:
                                'Formalizar a negociação significa que você concorda com os termos atuais da proposta, além de impedir que você siga com outras negociações.',
                              confirmButton: {
                                onClick: async () => {
                                  try {
                                    toggleLoading()
                                    await proposalService.acceptNegotiation(proposal.id, negotiation.id)
                                    push(`${pages.proposal}/${proposal.id}${pages.formalization}`)
                                  } catch (error) {
                                    toastHttpError(error)
                                  } finally {
                                    toggleLoading()
                                  }
                                },
                              },
                            })
                          }}
                          fullWidth
                        >
                          Formalizar Negociação
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleOpenConfirmDialog({
                              title: 'Aceitar oferta',
                              message:
                                'Aceitar a oferta significa que você concorda com os termos atuais da proposta e irá aguardar a resposta da empresa para formalizar a negociação.',
                              confirmButton: {
                                onClick: async () => {
                                  try {
                                    toggleLoading()
                                    await offerService.makeCompanyOffer({
                                      negotiationId: negotiation.id,
                                      userProponentId: session.user.id,
                                      companyProponentId: session.user.companyId!,
                                      description:
                                        'Mensagem automática: A empresa concorda com os termos atuais da proposta e deseja prosseguir a negociação.',
                                      proposalType: currentOffer.proposalType,
                                    })
                                    showToast('Oferta enviada com sucesso', 'success')
                                    mutate()
                                  } catch (error) {
                                    toastHttpError(error)
                                  } finally {
                                    toggleLoading()
                                  }
                                },
                              },
                            })
                          }}
                          fullWidth
                        >
                          Aceitar Oferta
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleOpenMakeAnOfferDialog(OfferCategory.counterProposal)}
                        fullWidth
                      >
                        Fazer Contra Proposta
                      </Button>
                      {/* <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleOpenConfirmDialog({
                            title: 'Recusar oferta',
                            message: 'Recusar a oferta significa não seguir em negociação com esta empresa.',
                            confirmButton: {
                              onClick: async () => {
                                try {
                                  await proposalService.rejectNegotiation(proposal.id, negotiation.id)
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
                        Recusar Oferta
                      </Button> */}
                    </Stack>
                  </>
                ) : (
                  <Typography color="warning.light" fontWeight="bold" textAlign="center">
                    Aguardando resposta da empresa
                  </Typography>
                )}
              </>
            )}
          </Section>
        </Box>
      </Wrapper>

      <MakeAnOfferDialog />
      <ScrollTop />
    </Layout>
  )
}

export default NegotiationPage

type Params = {
  id: string
  negotiationId: string
}

export const getServerSideProps = withAuth(async context => {
  const { params, session } = context
  const { id, negotiationId } = params as Params

  const { data: proposal } = await proposalService.get(id)
  const { data: negotiation } = await negotiationService.get(negotiationId)
  const { data: offersData } = await offerService.getCompanyOffers({
    negotiationId,
    orderBy: 'createdAt',
    orderDirection: OrderDirection.Desc,
  })

  const userParticipateInNegotiation =
    !!session.user.companyId &&
    [negotiation.companyProponent.id, negotiation.companyInterested.id].includes(session.user.companyId)
  const userIsICT = checkUserIsICT(session.user)

  if (!userParticipateInNegotiation && !userIsICT) return { notFound: true }

  if (proposal.status === ProposalStatus.onFormalization && !userIsICT) {
    return {
      redirect: {
        destination: `${pages.proposal}/${proposal.id}${pages.formalization}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      negotiation: {
        ...negotiation,
        proposal,
      },
      offers: offersData.offers,
      session,
    },
  }
})
