import { Box, BoxProps, Stack, StackProps, SvgIcon, Typography } from '@mui/material'

import { formatDate, formatString } from 'src/helpers/formatters'

import { Entity, UserAvatar } from 'src/components/shared'
import { IconData } from './icon-data'

import { CakeIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

export type DataSectionData = {
  icon: typeof SvgIcon
  value?: React.ReactNode
  order?: number
}

type DataSectionProps = {
  name: string
  createdAt?: string
  avatar: {
    src?: string | null
    canEdit?: boolean
  }
  data?: DataSectionData[]
  children?: React.ReactNode
  componentProps?: {
    wrapper?: BoxProps
  }
  entity?: Entity
}

export const DataSection = (props: DataSectionProps) => {
  const { createdAt, data, entity = 'user', name, avatar, children, componentProps } = props

  return (
    <Section {...componentProps?.wrapper} sx={{ '&&': { p: 0 }, overflow: 'hidden', ...componentProps?.wrapper?.sx }}>
      <Stack
        component="header"
        height={130}
        marginBottom={{ xs: 8, sm: 5 }}
        padding={theme => ({ xs: theme.spacing(4, 2), sm: 4 })}
        bgcolor="primary.main"
        justifyContent="flex-end"
      >
        <Stack direction="row" spacing={2} sx={{ transform: 'translateY(68%)' }}>
          <UserAvatar
            name={name}
            src={avatar.src}
            size={150}
            canEdit={avatar.canEdit}
            entityToEdit={entity}
            componentsProps={{
              avatar: { sx: { border: '5px solid white' } },
            }}
          />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="h1" color="primary.contrastText">
              {formatString.capitalizeFirstLetters(name)}
            </Typography>

            {!!createdAt && (
              <Stack mt={0.5} direction="row" spacing={0.5} color="grey.300">
                <CakeIcon color="inherit" sx={{ width: '1rem', height: '1rem' }} />
                <Typography variant="body2" color="inherit">
                  Membro {formatDate.distanceToNow(new Date(createdAt))}
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Stack>

      <Stack p={{ xs: 2, sm: 4 }} spacing={0.5}>
        <Box sx={{ display: { sm: 'none' } }}>
          <Typography component="h1" variant="h2" color="primary.main">
            {name}
          </Typography>

          {!!createdAt && (
            <Stack mt={1} direction="row" spacing={0.5} color="grey.800">
              <CakeIcon color="inherit" sx={{ width: '1rem', height: '1rem' }} />
              <Typography variant="body2" color="inherit">
                Membro {formatDate.distanceToNow(new Date(createdAt))}
              </Typography>
            </Stack>
          )}
        </Box>
        {data?.map(({ icon, value, order }, index) => (
          <IconData key={index} icon={icon} order={order}>
            {value}
          </IconData>
        ))}
      </Stack>

      {children}
    </Section>
  )
}

export type DataSectionFooterProps = StackProps

export const DataSectionFooter = (props: DataSectionFooterProps) => (
  <Stack component="footer" direction="row" p={2} pt={0} {...props} />
)
