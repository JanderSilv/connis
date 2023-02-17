import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

type SlideTransitionProps = {
  children: React.ReactElement<any, any>
} & TransitionProps

export const SlideTransition = forwardRef((props: SlideTransitionProps, ref: React.Ref<unknown>) => (
  <Slide direction="up" ref={ref} {...props} />
))
SlideTransition.displayName = 'SlideTransition'
