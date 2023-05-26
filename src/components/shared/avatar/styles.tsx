import { Box, Button, styled } from '@mui/material'

export const ChangeAvatarButton = styled(Button)({
  padding: 0,
  borderRadius: '50%',
  position: 'relative',
  overflow: 'hidden',

  '& > div': {
    '&::after': {
      content: '""',

      borderRadius: '50%',
      background: `center / 35px no-repeat url('/assets/icons/camera.svg')`,
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
