import { Box, BoxProps, Grow } from '@mui/material'

type TabPanelProps = {
  index: number
  value: number
} & BoxProps

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props

  return (
    <Grow in={value === index} unmountOnExit>
      <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...rest}>
        {children}
      </Box>
    </Grow>
  )
}
