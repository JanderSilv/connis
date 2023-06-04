import { Box, styled, Tab as MuiTab, Tabs as MuiTabs, Typography, TypographyProps } from '@mui/material'
import { Container } from 'src/components/container'

export const ProposalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}))
ProposalTitle.defaultProps = {
  variant: 'h1',
  gutterBottom: true,
}

export const Wrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  flexDirection: 'column-reverse',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },

  '& strong': {
    fontWeight: theme.typography.fontWeightMedium,
  },
}))
Wrapper.defaultProps = {
  component: 'section',
}

export const Section = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    borderRadius: 10,
    boxShadow: theme.shadows[3],
  },
}))
Section.defaultProps = {
  component: 'section',
}

export const DataContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

type TitleProps = {
  component?: React.ElementType
} & TypographyProps
export const Title = styled(Typography)<TitleProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))
Title.defaultProps = {
  component: 'h2',
  variant: 'h3',
  color: 'primary',
}

export const Subtitle = styled(Typography)<TitleProps>({})
Subtitle.defaultProps = {
  component: 'h3',
  variant: 'h5',
}

export const KeyData = styled(Typography)(({ theme }) => ({
  '& > strong': {
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

export const Tabs = styled(MuiTabs)(({ theme }) => ({
  display: 'none',
  paddingInline: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(2),
    display: 'flex',

    '& .MuiTabs-flexContainer': {
      gap: theme.spacing(4),
    },
  },
}))

export const Tab = styled(MuiTab)(({ theme }) => ({
  color: theme.palette.grey['600'],
  fontSize: theme.typography.pxToRem(18),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'initial',

  borderRadius: 4,
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.up('sm')]: {
    flex: 1,
  },
}))
