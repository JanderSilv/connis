import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

import { fakeData } from 'src/data/fake'
import { withAuth } from 'src/helpers/withAuth'
import { Offer, Proposal } from 'src/models/types'

import { Layout } from 'src/layouts/app'
import { AdCard, RecentOffers, RecentProposals } from 'src/components/home'

import { LibraryBooksIcon, NoteAddIcon } from 'src/assets/icons'
import { AsideB, ProposalButton, Title, Wrapper } from 'src/styles/home'

type Props = {
  myProposals: Proposal[]
  myOffers: Offer[]
}

const Home: NextPage<Props> = props => {
  const { myOffers, myProposals } = props
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
          <RecentProposals proposals={myProposals} />
          <RecentOffers offers={myOffers} mt={4} />
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

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  const { myProposals, recentOffers } = fakeData

  return {
    props: {
      myProposals,
      myOffers: recentOffers,
    },
  }
})
