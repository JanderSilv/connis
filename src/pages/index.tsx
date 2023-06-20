import { NextPage } from 'next'
import { Box, Typography } from '@mui/material'

import { HomeProps } from 'src/models/types/home'

import { OrderDirection, ProposalStatus, ProposalType } from 'src/models/enums'
import { Negotiation } from 'src/models/types'

import { pages } from 'src/constants'
import { checkUserIsCompany } from 'src/helpers/users'
import { withAuth } from 'src/helpers/withAuth'
import { negotiationService, proposalService } from 'src/services'

import { Layout } from 'src/layouts/app'
import { AdCard, ICTHome, RecentNegotiations, RecentProposals } from 'src/components/home'

import { LibraryBooksIcon, NoteAddIcon } from 'src/assets/icons'
import { AsideB, ProposalButton, Title, Wrapper } from 'src/styles/home'

const Home: NextPage<HomeProps> = props => {
  if (props.userType === 'company') {
    const { negotiations, proposals } = props

    return (
      <Layout>
        <Title>Seja bem vindo ao Connis.</Title>
        <Wrapper>
          <AsideB>
            <ProposalButton href="/cadastro-proposta">
              <NoteAddIcon color="primary" fontSize="large" />
              <Typography component="span" variant="h2" color="primary">
                Cadastrar Proposta
              </Typography>
              <Typography component="span" color="text.secondary">
                Descreva a dor do seu projeto para que outras empresas possam ajudar.
              </Typography>
            </ProposalButton>

            <ProposalButton href="/propostas">
              <LibraryBooksIcon color="primary" fontSize="large" />
              <Typography component="span" variant="h2" color="primary">
                Catálogo de Propostas
              </Typography>
              <Typography component="span" color="text.secondary">
                Visualize propostas de outras empresas.
              </Typography>
            </ProposalButton>
          </AsideB>

          <Box width="100%" flex={1}>
            <RecentProposals proposals={proposals} />
            <RecentNegotiations negotiations={negotiations} mt={4} />
          </Box>

          <Box component="aside">
            <AdCard
              image={{
                src: '/assets/images/cimatec-startups.jpg',
                alt: 'Banner do programa Cimatec Startups',
              }}
              href={`${pages.ictProfile}/senai-cimatec`}
            >
              Conheça o ICT Cimatec e desenvolva seu projeto ou ideia conosco.
            </AdCard>
          </Box>
        </Wrapper>
      </Layout>
    )
  }

  return <ICTHome data={props.data} />
}

export default Home

export const getServerSideProps = withAuth(async context => {
  const { user } = context.session

  if (checkUserIsCompany(user)) {
    const [{ data: proposals }, { data: interestedNegotiations }, { data: proponentNegotiations }] = await Promise.all([
      proposalService.list({
        pageSize: 2,
        companyId: user.companyId!,
        orderDirection: OrderDirection.Desc,
        orderBy: 'createdAt',
      }),
      negotiationService.list({
        pageSize: 2,
        companyInterestedId: user.companyId!,
      }),
      negotiationService.list({
        pageSize: 2,
        companyProponentId: user.companyId!,
      }),
    ])

    const negotiations = fillNegotiations(interestedNegotiations, proponentNegotiations)

    return {
      props: {
        userType: 'company',
        proposals,
        negotiations,
      },
    }
  }

  const [{ data: negotiations }, { data: catalog }] = await Promise.all([
    negotiationService.list({
      iCTInterestedId: user.ictId!,
    }),
    proposalService.list({
      pageSize: 8,
      type: [ProposalType.buyOrSell, ProposalType.donate, ProposalType.exchange],
      status: [ProposalStatus.opened],
      orderBy: 'createdAt',
      orderDirection: OrderDirection.Desc,
    }),
  ])

  return {
    props: {
      userType: 'ict',
      data: {
        negotiations,
        catalog,
      },
    },
  }
})

const fillNegotiations = (interestedNegotiations: Negotiation[], proponentNegotiations: Negotiation[]) => {
  const negotiations = interestedNegotiations
  if (interestedNegotiations.length < 2)
    proponentNegotiations.forEach(negotiation => {
      if (negotiations.length < 2) negotiations.push(negotiation)
    })
  return negotiations
}
