import { Chip, Stack, Typography } from '@mui/material'
import { proposalCategories } from 'src/data/proposal'
import { Proposal } from 'src/models/types'
import { DataContainer, Section, Title } from 'src/styles/proposal'

type Props = Proposal

export const ProposalDataSectionOne = (props: Props) => {
  const { createdAt, proposalCategory, proposalDescription, projectDescription, keywords } = props
  const { icon: CategoryIcon, title: categoryTitle } = proposalCategories[proposalCategory]

  return (
    <Section>
      <Typography component="time" variant="body2" color="text.secondary">
        Publicado em {createdAt}
      </Typography>

      <DataContainer>
        <Title>Categoria</Title>
        <Typography component="span" display="flex" alignItems="center" gap={1}>
          <CategoryIcon />
          {categoryTitle}
        </Typography>
      </DataContainer>

      <DataContainer>
        <Title>Descrição da Projeto</Title>
        <Typography>{projectDescription}</Typography>
      </DataContainer>

      <DataContainer>
        <Title>Descrição da Proposta</Title>
        <Typography>{proposalDescription}</Typography>
      </DataContainer>

      <DataContainer>
        <Title>Palavras Chaves</Title>
        <Stack direction="row" gap={1}>
          {keywords.map(keyword => (
            <Chip key={keyword} label={keyword} color="primary" />
          ))}
        </Stack>
      </DataContainer>
    </Section>
  )
}
