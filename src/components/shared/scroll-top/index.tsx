import { Box, BoxProps, Fab, styled, Theme, useMediaQuery, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUpIcon } from 'src/assets/icons'

type HasMobileNavigation = {
  hasMobileNavigation: true
  scrollTrigger: boolean
}

type HasNotMobileNavigation = {
  hasMobileNavigation?: false
  scrollTrigger?: never
}

type Props = {
  anchorId?: string
  shouldHide?: boolean
  children?: React.ReactNode
} & BoxProps &
  (HasMobileNavigation | HasNotMobileNavigation)

export const ScrollTop = (props: Props) => {
  const {
    anchorId = 'back-to-top-anchor',
    children,
    shouldHide,
    sx,
    scrollTrigger,
    hasMobileNavigation,
    ...rest
  } = props
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))

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
    <Wrapper
      {...rest}
      onClick={handleClick}
      sx={{
        ...sx,
        opacity: trigger ? 1 : 0,
        ...(isMobile &&
          hasMobileNavigation && {
            bottom: 70,
            transform: scrollTrigger ? 'translateY(50px)' : 'translateY(0)',
          }),
      }}
    >
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
