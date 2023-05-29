import { NextPage } from 'next'
import { Box, Typography } from '@mui/material'

import { HomeProps } from 'src/models/types/home'

import { checkUserIsCompany } from 'src/helpers/users'
import { withAuth } from 'src/helpers/withAuth'
import { proposalService } from 'src/services'

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
              href="https://www.senaicimatec.com.br/infraestrutura"
              openInNewTab
            >
              Conheça o ICT Cimatec e desenvolva seu projeto ou ideia conosco.
            </AdCard>
          </Box>
        </Wrapper>
      </Layout>
    )
  }

  const { negotiations, requests, opportunities } = props

  return <ICTHome negotiations={negotiations} opportunities={opportunities} requests={requests} />
}

export default Home

export const getServerSideProps = withAuth(async context => {
  const { user } = context.session
  const { data: proposals } = await proposalService.listCompanyProposals(user.companyId!, {
    pageSize: 2,
  })
  const { data: negotiations } = await proposalService.getCompanyNegotiations({
    pageSize: 2,
  })

  return {
    props: checkUserIsCompany(user)
      ? {
          userType: 'company',
          proposals,
          negotiations,
        }
      : {
          userType: 'ict',
          negotiations: proposals,
          requests: proposals,
          opportunities: proposals,
        },
  }
})
