import { MutableRefObject, useEffect, useState } from 'react'
import { Box, Button, Fade, Typography } from '@mui/material'
import { useWizard } from 'react-use-wizard'
import { useFormContext } from 'react-hook-form'

import { Proposal } from 'src/models/types'
import { Wrapper } from './styles'
import { StorageKeys } from 'src/models/enums'

type WizardStepsProps = {
  nextButtonRef: MutableRefObject<HTMLButtonElement | null>
  checkCanGoNextCustom?: (currentStep: number) => Promise<boolean>
}

type ProposalKey = keyof Proposal

const steps: (ProposalKey | ProposalKey[])[] = [
  'title',
  ['category', 'categoryOther'],
  ['types', 'budget'],
  'projectDescription',
  'description',
  'keywords',
  ['trl', 'goalTrl'],
]

export const WizardFooter = (props: WizardStepsProps) => {
  const { nextButtonRef, checkCanGoNextCustom } = props
  const { nextStep, previousStep, isFirstStep, isLastStep, activeStep, stepCount } = useWizard()
  const { trigger, clearErrors, getValues } = useFormContext<Proposal>()

  const [buttonType, setButtonType] = useState<'button' | 'submit'>('button')
  const [buttonsAreDisabled, setButtonsAreDisabled] = useState(false)

  useEffect(() => {
    setButtonsAreDisabled(true)
    setTimeout(() => setButtonsAreDisabled(false), 1000)
    setTimeout(() => clearErrors(), 0)
  }, [clearErrors, activeStep])

  const handleNext = async () => {
    if (isLastStep) return
    if (activeStep === stepCount - 2) setTimeout(() => setButtonType('submit'), 0)
    const canGoNext = await (async () => {
      const item = steps[activeStep]
      if (Array.isArray(item)) item.forEach(async key => await trigger(key))
      return await trigger(item)
    })()
    if (!canGoNext || (checkCanGoNextCustom && !(await checkCanGoNextCustom(activeStep + 1)))) return
    localStorage.setItem(StorageKeys.Proposal, JSON.stringify(getValues()))
    nextStep()
  }

  return (
    <Wrapper>
      <Box>
        <Typography component="span">{`${activeStep + 1} de ${stepCount}`}</Typography>
      </Box>
      <Box>
        <button type="submit" style={{ opacity: 0, all: 'unset' }} disabled={buttonsAreDisabled} />
        <Fade in={!isFirstStep}>
          <Button
            onClick={() => {
              previousStep()
              setButtonType('button')
            }}
            disabled={buttonsAreDisabled}
          >
            Voltar
          </Button>
        </Fade>
        <Button type={buttonType} ref={nextButtonRef} onClick={handleNext} disabled={buttonsAreDisabled}>
          {!isLastStep ? 'Próximo' : 'Cadastrar'}
        </Button>
      </Box>
    </Wrapper>
  )
}
