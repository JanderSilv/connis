import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Box, Button, Collapse, FormControlLabel, FormGroup, InputAdornment, Stack, TextField } from '@mui/material'

import { ProposalCategory, ProposalStatus, ProposalType } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { proposalCategoryOptions, proposalTypeOptions, trlOptions } from 'src/data/proposal'

import { Layout } from 'src/layouts/app'
import { Checkbox, FormControl, FormLabel, Slider, Wrapper } from 'src/styles/proposals'
import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from 'src/assets/icons'

type Props = {
  proposals: Proposal[]
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

const Proposals: NextPage<Props> = ({ proposals }) => {
  const [shouldShowTRLs, setShouldShowTRLs] = useState(false)

  const [value, setValue] = useState<number[]>([1000, 10_000])

  const handleChange = (_: Event, newValue: number | number[]) => setValue(newValue as number[])

  return (
    <Layout>
      <Wrapper>
        <Box component="aside">
          <Stack position="sticky" top={32} gap={2}>
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
                aria-label="Orçamento"
                aria-labelledby="budget-slider"
                getAriaValueText={formatCurrency}
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

        <Box component="main">
          {proposals.map(proposal => (
            <></>
          ))}
        </Box>
      </Wrapper>
    </Layout>
  )
}

export default Proposals

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
    {
      id: 3,
      title: 'Título da proposta 3',
      description: 'Descrição da proposta',
      date: '10/01/2022',
      views: 1000,
      status: ProposalStatus.finished,
      category: ProposalCategory.incrementalInnovation,
      recentActivities: 0,
    },
  ]

  return {
    props: {
      proposals,
    },
  }
}
