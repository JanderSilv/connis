import { useEffect, useRef } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { AnimatePresence } from 'framer-motion'
import { Box, Collapse, Container, Stack, Typography } from '@mui/material'

import { OrderDirection, ProposalStatus, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { useIsElementOnScreen } from 'src/hooks'
import { useProposalsFilters } from 'src/hooks/proposals'
import { ProposalsParams, proposalService } from 'src/services/proposal'

import { ProposalCard } from 'src/components/proposal'
import { MotionGridContainer, MotionGridItem } from 'src/components/motion'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  initialProposals: Proposal[]
}

const Proposals: NextPage<Props> = props => {
  const { initialProposals } = props
  const {
    filteredProposals,
    ProposalsFilters,
    OrderDirectionButton,
    isLoadingMore,
    setSize,
    size,
    isReachingEnd,
    isFetching,
  } = useProposalsFilters(initialProposals, {
    organization: 'company',
    defaultParams: PROPOSALS_PARAMS,
  })

  const infiniteScrollTextRef = useRef<HTMLParagraphElement>(null)
  const isInfiniteScrollTextVisible = useIsElementOnScreen(infiniteScrollTextRef)

  useEffect(() => {
    if (isInfiniteScrollTextVisible && !isReachingEnd && !isLoadingMore) setSize(size + 1)
  }, [isInfiniteScrollTextVisible, isLoadingMore, isReachingEnd, setSize, size])

  return (
    <Layout documentTitle="Catálogo de Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Catálogo de Propostas
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mt={2}
        px={{
          xs: 2,
          md: 6,
        }}
        spacing={2}
      >
        <Collapse in={isFetching}>
          <Typography variant="body2" color="grey.700">
            Carregando...
          </Typography>
        </Collapse>
        <OrderDirectionButton />
      </Stack>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <ProposalsFilters />
        </Box>

        <Container component="main" maxWidth="xl">
          <AnimatePresence mode="wait">
            {filteredProposals.length ? (
              <MotionGridContainer>
                {filteredProposals.map(proposal => (
                  <MotionGridItem key={proposal.id}>
                    <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
                  </MotionGridItem>
                ))}
              </MotionGridContainer>
            ) : (
              <Stack alignItems="center" justifyContent="center" height="100%">
                <Typography variant="body2" color="grey.700" textAlign="center">
                  Nenhuma proposta encontrada 😥
                </Typography>
              </Stack>
            )}
          </AnimatePresence>

          {size >= 12 && (
            <Typography ref={infiniteScrollTextRef} textAlign="center">
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

export default Proposals

const PAGE_SIZE = 12
const PROPOSALS_PARAMS: ProposalsParams = {
  pageSize: PAGE_SIZE,
  type: [ProposalType.buyOrSell, ProposalType.donate, ProposalType.exchange],
  status: [ProposalStatus.opened],
  orderBy: 'createdAt',
  orderDirection: OrderDirection.Desc,
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: proposals } = await proposalService.list(PROPOSALS_PARAMS)
    return {
      props: {
        initialProposals: proposals,
      },

      revalidate: 60_000,
    }
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      initialProposals: [],
    },
  }
}
