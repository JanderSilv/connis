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
        <Typography variant="h1" color="primary" textAlign="center" mb={1}>
          Métrica TRL (Technology Readiness Level)
        </Typography>

        <Typography mb={2}>
          Um número TRL é alcançado uma vez que a descrição no diagrama tenha sido alcançada. Por exemplo, alcançar a
          TRL 4 com sucesso (ambiente de laboratório) não move a tecnologia para TRL 5. TRL 5 é alcançado quando há
          validação da tecnologia em um ambiente relevante. A tecnologia permanece TRL 4 até que a validação ambiental
          relevante seja concluída.
        </Typography>

        <Typography component="h2" variant="h3">
          Níveis:
        </Typography>

        <Box component="ul" mt={0}>
          {trlPage.map(item => (
            <li key={item.title}>
              <Typography component="h3" variant="h4" mb={1}>
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
