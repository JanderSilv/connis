import { NextPage } from 'next'
import { Box, Container, Typography } from '@mui/material'

import { trlPage } from 'src/data/proposal'

import { Layout } from 'src/layouts/auth'

const TRLSPage: NextPage = () => {
  return (
    <Layout
      documentTitle="TRLs"
      illustration={{
        breakpoint: 'md',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,

          background: 'rgba(249, 249, 249, 0.4)',
          backdropFilter: 'blur(6px)',
          borderRadius: 1,

          '& ul > li > p': {
            textAlign: 'justify',
          },
        }}
      >
        <Typography variant="h1" color="primary" textAlign="center" mb={2}>
          Métrica de TRL (Technology Readiness Level)
        </Typography>

        <Box component="ul">
          {trlPage.map(item => (
            <li key={item.title}>
              <Typography component="h2" variant="h6">
                {item.title}
              </Typography>
              <Typography mb={2}>{item.description}</Typography>
            </li>
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export default TRLSPage
