import { useCallback, useState } from 'react'
import { UseFormTrigger } from 'react-hook-form'
import { UserSignUpSchema } from 'src/validations/user-sign-up'

type UserSignUpKey = keyof UserSignUpSchema

const steps: UserSignUpKey[] = ['name', 'userName', 'email', 'phone', 'password']

export const useStep = (trigger: UseFormTrigger<UserSignUpSchema>) => {
  const [step, setStep] = useState(1)

  const handleNextStep = useCallback(async () => {
    if (step === steps.length) return

    for await (const [index, stepKey] of Object.entries(steps)) {
      if (Number(index) >= step - 1) break
      if (['userName', 'email'].includes(stepKey)) continue
      const canGoNext = await trigger(stepKey)
      if (!canGoNext) return
    }

    const canGoNext = await trigger(steps[step - 1])
    if (canGoNext) setStep(step + 1)
  }, [step, trigger])

  return {
    step,
    stepsCount: steps.length,
    handleNextStep,
  }
}
