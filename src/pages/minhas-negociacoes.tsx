import { useEffect, useRef } from 'react'
import { NextPage } from 'next'
import { Grid, Stack, Typography } from '@mui/material'

import { Negotiation } from 'src/models/types'

import { withAuth } from 'src/helpers/withAuth'
import { useIsElementOnScreen } from 'src/hooks'
import { useNegotiationsFilters } from 'src/hooks/negotiations'
import { negotiationService } from 'src/services'

import { NegotiationCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { Wrapper } from 'src/styles/proposals'

type Props = {
  initialNegotiations: Negotiation[]
}

const MyNegotiations: NextPage<Props> = ({ initialNegotiations }) => {
  const { filteredNegotiations, OrderDirectionButton, isLoadingMore, setSize, size, isReachingEnd } =
    useNegotiationsFilters(initialNegotiations)

  const infiniteScrollTextRef = useRef<HTMLParagraphElement>(null)
  const isInfiniteScrollTextVisible = useIsElementOnScreen(infiniteScrollTextRef)

  const hasNegotiations = size > 0

  useEffect(() => {
    if (isInfiniteScrollTextVisible && !isReachingEnd) setSize(size + 1)
  }, [isInfiniteScrollTextVisible, isReachingEnd, setSize, size])

  return (
    <Layout documentTitle="Minhas Negociações">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Minhas Negociações
      </Typography>

      {hasNegotiations && (
        <Stack direction="row" justifyContent="flex-end" px={2} mt={2}>
          <OrderDirectionButton />
        </Stack>
      )}

      <Wrapper>
        <Grid container spacing={2}>
          {filteredNegotiations.map(negotiations => (
            <Grid key={negotiations.id} item sm={6} lg={4} xl={3}>
              <NegotiationCard key={negotiations.id} negotiation={negotiations} unseenActivities={1} layout="card" />
            </Grid>
          ))}
        </Grid>
      </Wrapper>

      {size >= 12 && (
        <Typography ref={infiniteScrollTextRef} textAlign="center">
          {isLoadingMore
            ? 'Carregando...'
            : isReachingEnd
            ? 'Sem mais negociações.'
            : 'Continue descendo para carregar mais'}
        </Typography>
      )}
    </Layout>
  )
}

export default MyNegotiations

export const getServerSideProps = withAuth(async () => {
  const { data: negotiations } = await negotiationService.list({
    pageSize: 12,
  })

  return {
    props: {
      initialNegotiations: negotiations,
    },
  }
})
