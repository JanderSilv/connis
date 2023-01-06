import { Box, ListItemButton as MuiListItemButton, styled, Typography } from '@mui/material'

export const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  minHeight: 110,
  padding: 0,
  borderRadius: 4,
  boxShadow: theme.shadows[4],
  alignItems: 'stretch',
  flexDirection: 'column-reverse',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}))

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1, 2),
}))
Header.defaultProps = {
  component: 'header',
}

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

export const Description = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  lineClamp: '2',
  WebkitLineClamp: '2',
  textOverflow: 'ellipsis',

  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  overflow: 'hidden',
}))
Description.defaultProps = {
  variant: 'body2',
}

export const BadgeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    maxWidth: 140,
    minWidth: 140,
    flexDirection: 'column',
  },
}))