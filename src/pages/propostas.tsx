import { useEffect, useRef } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { AnimatePresence } from 'framer-motion'
import { Box, Container, Stack, Typography } from '@mui/material'

import { ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { useIsElementOnScreen } from 'src/hooks'
import { useProposalsFilters } from 'src/hooks/proposals'
import { proposalService } from 'src/services/proposal'

import { ProposalCard } from 'src/components/proposal'
import { MotionGridContainer, MotionGridItem } from 'src/components/motion'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  initialProposals: Proposal[]
}

const Proposals: NextPage<Props> = props => {
  const { initialProposals } = props
  const { filteredProposals, ProposalsFilters, isLoadingMore, setSize, size, isReachingEnd } = useProposalsFilters(
    initialProposals,
    {
      organization: 'company',
    }
  )

  const infiniteScrollTextRef = useRef<HTMLParagraphElement>(null)
  const isInfiniteScrollTextVisible = useIsElementOnScreen(infiniteScrollTextRef)

  useEffect(() => {
    if (isInfiniteScrollTextVisible && !isReachingEnd) setSize(size + 1)
  }, [isInfiniteScrollTextVisible, isReachingEnd, setSize, size])

  return (
    <Layout documentTitle="Catálogo de Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Catálogo de Propostas
      </Typography>

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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: proposals } = await proposalService.list({
      pageSize: 12,
      type: [ProposalType.buyOrSell, ProposalType.donate, ProposalType.exchange],
    })
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
