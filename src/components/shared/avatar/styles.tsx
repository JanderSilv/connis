import ReactDOMServer from 'react-dom/server'
import { Box, Button, styled } from '@mui/material'
import { PhotoCameraIcon } from 'src/assets/icons'

const makeIconContent = () => {
  const iconSvg = ReactDOMServer.renderToStaticMarkup(<PhotoCameraIcon color="primary" />)
  const svgIconWithXlmns = iconSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" fill="linen" ')
  const resultUrl = "url('data:image/svg+xml," + svgIconWithXlmns + "')"
  return resultUrl
}

export const ChangeAvatarButton = styled(Button)({
  padding: 0,
  borderRadius: '50%',
  position: 'relative',
  overflow: 'hidden',

  '& > div': {
    '&::after': {
      content: '""',

      borderRadius: '50%',
      background: `center / 35px no-repeat ${makeIconContent()}`,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',

      position: 'absolute',
      inset: 0,
      opacity: 0,

      transition: 'opacity 0.2s ease-in-out',
    },

    '&:hover::after': {
      opacity: 1,
    },
  },
})

export const EditorWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
}))
