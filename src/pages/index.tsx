import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

import { ProposalCategory, ProposalStatus } from 'src/models/enums'
import { Layout } from 'src/layouts/app'
import { AdCard, RecentActivities } from 'src/components/home'
import { ProposalCardProps } from 'src/components/proposal'

import { LibraryBooksIcon, NoteAddIcon } from 'src/assets/icons'
import { AsideB, ProposalButton, Title, Wrapper } from 'src/styles/home'

type Props = {
  proposals: ProposalCardProps[]
  offers: ProposalCardProps[]
}

const Home: NextPage<Props> = ({ offers, proposals }) => {
  return (
    <Layout>
      <Title>Seja bem vindo ao Connis.</Title>
      <Wrapper>
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

        <Box width="100%" flex={1}>
          <RecentActivities
            title="Propostas Recentes"
            activities={proposals}
            seeMoreLink="/minhas-propostas"
            emptyText="Nenhuma proposta recente"
            listProps={{
              'aria-label': 'Propostas Recentes',
            }}
            shouldHideMoreButton
          />
          <RecentActivities
            title="Ofertas Recentes"
            activities={offers}
            seeMoreLink="/minhas-ofertas"
            emptyText="Nenhuma oferta recente"
            listProps={{
              'aria-label': 'Ofertas Recentes',
            }}
            mt={4}
            shouldHideMoreButton
          />
        </Box>

        <AsideB>
          <Link href="/cadastro-proposta" passHref>
            <ProposalButton>
              <NoteAddIcon color="primary" fontSize="large" />
              <Typography component="span" variant="h2" color="primary">
                Cadastrar Proposta
              </Typography>
              <Typography component="span" color="text.secondary">
                Descreva a dor do seu projeto para que outras empresas possam ajudar.
              </Typography>
            </ProposalButton>
          </Link>

          <Link href="/propostas" passHref>
            <ProposalButton>
              <LibraryBooksIcon color="primary" fontSize="large" />
              <Typography component="span" variant="h2" color="primary">
                Catálogo de Propostas
              </Typography>
              <Typography component="span" color="text.secondary">
                Visualize propostas de outras empresas.
              </Typography>
            </ProposalButton>
          </Link>
        </AsideB>
      </Wrapper>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const proposals = [
    {
      id: 1,
      title: 'Título da proposta',
      description: 'Descrição da proposta',
      date: '10/01/2022',
      views: 10,
      status: ProposalStatus.opened,
      category: ProposalCategory.waste,
      recentActivities: 1,
    },
    {
      id: 2,
      title: 'Título da proposta 2',
      description: 'Descrição da proposta',
      date: '10/01/2022',
      views: 5,
      status: ProposalStatus.canceled,
      category: ProposalCategory.disruptiveInnovation,
      recentActivities: 0,
    },
  ]

  const offers = [
    {
      id: 3,
      title: 'Título da proposta 3',
      description: 'Descrição da proposta',
      date: '10/01/2022',
      status: ProposalStatus.finished,
      category: ProposalCategory.incrementalInnovation,
      recentActivities: 0,
    },
    {
      id: 4,
      title: 'Título da proposta 4',
      description: 'Descrição da proposta',
      date: '07/08/2022',
      status: ProposalStatus.onNegotiation,
      category: ProposalCategory.others,
      otherCategory: 'Serviços',
      recentActivities: 3,
    },
  ]

  return {
    props: {
      proposals,
      offers,
    },
  }
}
