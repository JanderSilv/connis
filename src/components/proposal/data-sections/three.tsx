import { Typography } from '@mui/material'
import { makeWasteQuestionsData } from 'src/helpers/proposal'
import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import { DataContainer, Section, Subtitle, Title } from 'src/styles/proposal'

type Props = Proposal

export const ProposalDataSectionThree = (props: Props) => {
  const { category, wasteQuestions } = props

  if (!wasteQuestions) return null

  return (
    <Section sx={{ my: 3 }}>
      <Title>Informações Adicionais</Title>
      {(() => {
        if (category === ProposalCategory.waste) {
          const waste = wasteQuestions
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
