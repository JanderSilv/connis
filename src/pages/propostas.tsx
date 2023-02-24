import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import {
  Box,
  Button,
  Collapse,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { ProposalCategory, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal'
import { formatCurrency } from 'src/helpers/formatters'

import { ProposalCard } from 'src/components/proposal'
import { Layout } from 'src/layouts/app'

import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from 'src/assets/icons'
import { Checkbox, FormControl, FormLabel, Slider, Wrapper } from 'src/styles/proposals'

type Props = {
  proposals: Proposal[]
}

const Proposals: NextPage<Props> = ({ proposals }) => {
  const [shouldShowTRLs, setShouldShowTRLs] = useState(false)
  const [value, setValue] = useState([1000, 10_000])

  const handleChange = (_: Event, newValue: number | number[]) => setValue(newValue as number[])

  return (
    <Layout documentTitle="Catálogo de Propostas">
      <Typography variant="h1" color="primary" textAlign="center" mt={2}>
        Catálogo de Propostas
      </Typography>

      <Wrapper>
        <Box component="aside" width="100%" flex={1}>
          <Stack minWidth={250} maxWidth={{ md: 300 }} position="sticky" top={32} gap={2}>
            <TextField
              variant="outlined"
              label="Pesquise um termo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              fullWidth
            />

            <FormControl>
              <FormLabel>Categorias</FormLabel>
              <FormGroup>
                {proposalCategoryOptions.map(category => {
                  if (category.id === ProposalCategory.others) return null
                  return <FormControlLabel key={category.id} label={category.title} control={<Checkbox />} />
                })}
              </FormGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <FormGroup>
                {proposalTypeOptions.map(type => {
                  if (type.id === ProposalType.research) return null
                  return <FormControlLabel key={type.id} label={type.title} control={<Checkbox />} />
                })}
              </FormGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="budget-slider">Orçamento</FormLabel>
              <Slider
                aria-labelledby="budget-slider"
                getAriaLabel={index => (index === 0 ? 'Orçamento mínimo' : 'Orçamento máximo')}
                getAriaValueText={value => formatCurrency(value)}
                value={value}
                onChange={handleChange}
                min={1000}
                max={100_000}
                step={1000}
                marks={[
                  {
                    value: 1000,
                    label: formatCurrency(value[0]),
                  },
                  {
                    value: 100_000,
                    label: formatCurrency(value[1]),
                  },
                ]}
                size="small"
                disableSwap
              />
            </FormControl>

            <FormControl>
              <FormLabel>TRL</FormLabel>
              <Collapse in={shouldShowTRLs} collapsedSize={190}>
                <FormGroup>
                  {trlOptions.map(trl => (
                    <FormControlLabel key={trl.id} label={trl.label} control={<Checkbox />} />
                  ))}
                </FormGroup>
              </Collapse>
              <Button
                variant="text"
                endIcon={!shouldShowTRLs ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                onClick={() => setShouldShowTRLs(prevState => !prevState)}
                sx={{ maxWidth: 'fit-content', textTransform: 'initial' }}
              >
                {!shouldShowTRLs ? 'Ver mais' : 'Ver menos'}
              </Button>
            </FormControl>
          </Stack>
        </Box>

        <Container component="main" maxWidth="xl">
          <Grid container spacing={2}>
            {[...proposals, ...proposals].map(proposal => (
              <Grid key={proposal.id} item sm={6} lg={4} xl={3}>
                <ProposalCard key={proposal.id} proposal={proposal} layout="card" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Proposals

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: fetch proposals from API
  const { myProposals } = fakeData

  return {
    props: {
      proposals: myProposals,
    },
  }
}
