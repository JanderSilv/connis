import { Grid } from '@mui/material'
import { motion } from 'framer-motion'

export const MotionGrid = motion(Grid)

export const MotionGridContainer = motion(Grid)
MotionGridContainer.defaultProps = {
  container: true,
  spacing: 2,
  variants: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
}

export const MotionGridItem = motion(Grid)
MotionGridItem.defaultProps = {
  item: true,
  sm: 6,
  lg: 4,
  xl: 3,
  variants: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
}
