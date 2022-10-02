import { MutableRefObject, ReactNode, useEffect } from 'react'
import { Paper } from '@mui/material'
import { motion, Variants } from 'framer-motion'
import { useWizard } from 'react-use-wizard'

type AnimatedStepProps = {
  children: ReactNode
  previousStep: MutableRefObject<number>
}

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 800 : -800,
    opacity: 0,
    zIndex: 0,
  }),
}

export const AnimatedStep = ({ children, previousStep }: AnimatedStepProps) => {
  const { activeStep } = useWizard()

  useEffect(() => {
    return () => {
      previousStep.current = activeStep
    }
  }, [previousStep, activeStep])

  return (
    <Paper
      component={motion.section}
      custom={activeStep - previousStep.current}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 15,
      }}
      sx={{
        minHeight: 130,
        padding: {
          xs: 2,
          sm: 4,
        },
        borderRadius: 4,
      }}
    >
      {children}
    </Paper>
  )
}
