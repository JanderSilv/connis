import { Box, BoxProps, Fab, styled, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUpIcon } from 'src/assets/icons'

type Props = {
  anchorId?: string
  shouldHide?: boolean
  children?: React.ReactNode
} & BoxProps

export const ScrollTop = (props: Props) => {
  const { anchorId = 'back-to-top-anchor', children, shouldHide, sx, ...rest } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  if (shouldHide) return null

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(`#${anchorId}`)
    if (anchor) anchor.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  return (
    <Wrapper {...rest} onClick={handleClick} sx={{ ...sx, opacity: trigger ? 1 : 0 }}>
      {!!children ? (
        children
      ) : (
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Wrapper>
  )
}

export const Wrapper = styled(Box)({
  position: 'fixed',
  bottom: 16,
  right: 16,
  transition: 'opacity 0.3s, transform 0.3s',
})
Wrapper.defaultProps = {
  role: 'presentation',
}
