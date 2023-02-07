import { Box, styled } from '@mui/material'

export type ContainerProps = {
  isTheUser?: boolean
  withoutArrow?: boolean
}

export const Container = styled(Box)<ContainerProps>(props => {
  const { withoutArrow = false, theme, isTheUser } = props

  const { palette } = theme

  const bgColor = isTheUser ? theme.palette.primary.main : palette.grey[200]

  const getArrow = () => {
    if (withoutArrow) return {}
    if (isTheUser)
      return {
        borderTopRightRadius: 0,
        '&::after': {
          content: "''",
          borderTop: '0px solid transparent',
          borderBottom: '16px solid transparent',
          borderLeft: `10px solid ${bgColor}`,

          position: 'absolute',
          top: 0,
          left: '100%',
        },
      }
    return {
      borderTopLeftRadius: 0,
      '&::before': {
        content: "''",
        borderTop: '0px solid transparent',
        borderBottom: '16px solid transparent',
        borderRight: `10px solid ${bgColor}`,
        filter: 'drop-shadow(-1px 1px 1px rgba(0, 0, 0, 0.1))',
        position: 'absolute',
        top: 0,
        right: '100%',
      },
    }
  }

  return {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    backgroundColor: bgColor,
    boxShadow: theme.shadows[1],
    position: 'relative',

    ...getArrow(),
  }
})
