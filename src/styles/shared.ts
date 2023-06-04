import { Box, styled } from '@mui/material'

export const VideoWrapper = styled(Box)(() => ({
  width: '100%',
  height: 0,
  paddingTop: '56.25%',
  position: 'relative',

  '& > iframe': {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}))
