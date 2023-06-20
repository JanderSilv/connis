import { useEffect, useRef } from 'react'
import { NextPage } from 'next'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'

import { OrderDirection } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { withAuth } from 'src/helpers/withAuth'
import { useIsElementOnScreen } from 'src/hooks'
import { useProposalsFilters } from 'src/hooks/proposals'
import { ProposalsParams, proposalService } from 'src/services/proposal'

import { ProposalCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  proposals: Proposal[]
  companyId: string
}

const MyProposals: NextPage<Props> = ({ proposals, companyId }) => {
  const { filteredProposals, ProposalsFilters, OrderDirectionButton, size, isReachingEnd, isLoadingMore, setSize } =
    useProposalsFilters(proposals, {
      fetchAllTypes: true,
      defaultParams: {
        ...PROPOSALS_PARAMS,
        companyId,
      },
    })

  const infiniteScrollTextRef = useRef<HTMLParagraphElement>(null)
  const isInfiniteScrollTextVisible = useIsElementOnScreen(infiniteScrollTextRef)

  useEffect(() => {
    if (isInfiniteScrollTextVisible && !isReachingEnd && !isLoadingMore) setSize(size + 1)
  }, [isInfiniteScrollTextVisible, isLoadingMore, isReachingEnd, setSize, size])

  return (
    <Layout documentTitle="Minhas Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Minhas Propostas
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-end"
        mt={2}
        px={{
          xs: 2,
          md: 6,
        }}
      >
        <OrderDirectionButton />
      </Stack>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <ProposalsFilters />
        </Box>

        <Container component="main" maxWidth="xl">
          <Grid container spacing={2}>
            {filteredProposals.map(proposal => (
              <Grid key={proposal.id} item sm={6} lg={4} xl={3}>
                <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
              </Grid>
            ))}
          </Grid>

          {filteredProposals.length >= PAGE_SIZE && (
            <Typography ref={infiniteScrollTextRef} mt={2} textAlign="center">
              {isLoadingMore
                ? 'Carregando...'
                : isReachingEnd
                ? 'Sem mais propostas.'
                : 'Continue descendo para carregar mais'}
            </Typography>
          )}
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default MyProposals

const PAGE_SIZE = 12
const PROPOSALS_PARAMS: ProposalsParams = {
  pageSize: PAGE_SIZE,
  orderBy: 'createdAt',
  orderDirection: OrderDirection.Desc,
}

export const getServerSideProps = withAuth(async context => {
  context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  const { data: proposals } = await proposalService.list({
    ...PROPOSALS_PARAMS,
    companyId: context.session.user.companyId!,
  })

  return {
    props: {
      proposals,
      companyId: context.session.user.companyId!,
    },
  }
})
