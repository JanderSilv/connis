import { MutableRefObject, useEffect } from 'react'
import { Box, Button, Fade, Typography } from '@mui/material'
import { useWizard } from 'react-use-wizard'
import { useFormContext } from 'react-hook-form'
import { Proposal } from 'src/models/types'
import { Wrapper } from './styles'

type WizardStepsProps = {
  nextButtonRef: MutableRefObject<HTMLButtonElement | null>
  checkCanGoNextCustom?: (currentStep: number) => Promise<boolean>
}

type ProposalKey = keyof Proposal

const steps: (ProposalKey | ProposalKey[])[] = [
  'title',
  ['category', 'categoryOther'],
  ['type', 'budget'],
  'projectDescription',
  'description',
  'keywords',
  ['trl', 'goalTrl'],
]

export const WizardFooter = (props: WizardStepsProps) => {
  const { nextButtonRef, checkCanGoNextCustom } = props
  const { nextStep, previousStep, isFirstStep, isLastStep, activeStep, stepCount } = useWizard()
  const {
    trigger,
    clearErrors,
    formState: { isSubmitSuccessful },
  } = useFormContext<Proposal>()

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
    if (!canGoNext || (checkCanGoNextCustom && !(await checkCanGoNextCustom(activeStep + 1)))) return
    nextStep()
  }

  return (
    <Wrapper>
      <Box>
        <Typography component="span">{`${activeStep + 1} de ${stepCount}`}</Typography>
      </Box>
      <Box>
        <Fade in={!isFirstStep}>
          <Button onClick={previousStep} disabled={isSubmitSuccessful}>
            Voltar
          </Button>
        </Fade>
        <Button
          type={!isLastStep ? 'button' : 'submit'}
          ref={nextButtonRef}
          onClick={handleNext}
          disabled={isSubmitSuccessful}
        >
          {!isLastStep ? 'Próximo' : 'Cadastrar'}
        </Button>
      </Box>
    </Wrapper>
  )
}
