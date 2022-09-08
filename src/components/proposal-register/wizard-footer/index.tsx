import { MutableRefObject, useEffect } from 'react'
import { Box, Button, Fade, Typography } from '@mui/material'
import { useWizard } from 'react-use-wizard'
import { useFormContext } from 'react-hook-form'
import { Proposal } from 'src/models/types'
import { Wrapper } from './styles'

type WizardStepsProps = {
  nextButtonRef: MutableRefObject<HTMLButtonElement | null>
}

type ProposalKey = keyof Proposal

const steps: (ProposalKey | ProposalKey[])[] = [
  'title',
  ['proposalCategory', 'proposalCategoryOther'],
  'projectDescription',
  ['proposalDescription', 'keywords'],
  'proposalType',
]

export const WizardFooter = ({ nextButtonRef }: WizardStepsProps) => {
  const { nextStep, previousStep, isFirstStep, isLastStep, activeStep, stepCount } = useWizard()
  const { trigger, clearErrors } = useFormContext<Proposal>()

  useEffect(() => {
    setTimeout(() => clearErrors(), 0)
  }, [clearErrors, activeStep])

  const handleNext = async () => {
    if (isLastStep) return
    const canGoNext = await (async () => {
      const item = steps[activeStep]
      if (Array.isArray(item)) item.forEach(async key => await trigger(key))
      return await trigger(item)
    })()
    if (canGoNext) nextStep()
  }

  return (
    <Wrapper>
      <Box>
        <Typography component="span">{`${activeStep + 1} de ${stepCount}`}</Typography>
      </Box>
      <Box>
        <Fade in={!isFirstStep}>
          <Button onClick={previousStep}>Voltar</Button>
        </Fade>
        <Button type={!isLastStep ? 'button' : 'submit'} ref={nextButtonRef} onClick={handleNext}>
          {!isLastStep ? 'Próximo' : 'Cadastrar'}
        </Button>
      </Box>
    </Wrapper>
  )
}
