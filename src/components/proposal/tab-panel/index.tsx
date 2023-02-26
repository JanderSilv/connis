import { Box, BoxProps, Grow, GrowProps } from '@mui/material'

type HasGrowAnimation = {
  withGrowAnimation?: true
  growAnimationProps?: GrowProps
}
type HasNoGrowAnimation = {
  withGrowAnimation?: false
  growAnimationProps?: never
}

type TabPanelProps = {
  index: number
  value: number
} & BoxProps &
  (HasGrowAnimation | HasNoGrowAnimation)

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, withGrowAnimation, ...rest } = props

  const tabPanel = (
    <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...rest}>
      {children}
    </Box>
  )

  if (withGrowAnimation)
    return (
      <Grow in={value === index} unmountOnExit {...props.growAnimationProps}>
        {tabPanel}
      </Grow>
    )

  return tabPanel
}
