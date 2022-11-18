import { Box, BoxProps, Fab, Fade, FadeProps, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUpIcon } from 'src/assets/icons'

type Props = {
  anchorId?: string
  showCondition?: boolean
  children?: React.ReactNode
  fadeProps?: FadeProps
  boxProps?: BoxProps
}

export const ScrollTop = (props: Props) => {
  const { anchorId = 'back-to-top-anchor', children, showCondition, fadeProps, boxProps } = props

  console.log({ showCondition })

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(`#${anchorId}`)

    if (anchor) anchor.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  return (
    <Fade {...fadeProps} in={showCondition !== undefined ? showCondition && trigger : trigger}>
      <Box
        role="presentation"
        {...boxProps}
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 16, right: 16, ...boxProps?.sx }}
      >
        {!!children ? (
          children
        ) : (
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        )}
      </Box>
    </Fade>
  )
}
