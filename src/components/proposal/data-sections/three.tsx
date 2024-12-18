import { Typography } from '@mui/material'
import { makeWasteQuestionsData } from 'src/helpers/proposal'
import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { DataContainer, Section, Subtitle, Title } from 'src/styles/proposal'

type Props = Proposal

export const ProposalDataSectionThree = (props: Props) => {
  const { proposalCategory, categoryQuestions } = props

  return (
    <Section sx={{ my: 3 }}>
      <Title>Informações Adicionais</Title>
      {(() => {
        if (proposalCategory === ProposalCategory.waste) {
          const waste = categoryQuestions.waste
          if (!waste) return
          return makeWasteQuestionsData(waste).map(({ question, answer }, index) => (
            <DataContainer key={question}>
              <Subtitle>
                {index + 1}. {question}
              </Subtitle>
              <Typography>{answer}</Typography>
            </DataContainer>
          ))
        }
      })()}
    </Section>
  )
}
