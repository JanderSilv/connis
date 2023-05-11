import { useSession } from 'next-auth/react'
import { Box, Stack, SvgIcon, Typography } from '@mui/material'

import { OldUser } from 'src/models/types'
import { formatDate } from 'src/helpers/formatters'

import { UserAvatar } from 'src/components/shared'
import { IconData } from './icon-data'

import { CakeIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

type DataSectionProps = {
  user: OldUser
  data?: {
    icon: typeof SvgIcon
    value?: React.ReactNode
  }[]
}

export const DataSection = (props: DataSectionProps) => {
  const { user, data } = props
  const { id, name, image, createdAt } = user

  const { data: session } = useSession()

  return (
    <Section sx={{ '&&': { p: 0 }, overflow: 'hidden' }}>
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
            src={image}
            size={150}
            canEdit={session?.user?.id === id}
            componentsProps={{
              avatar: { sx: { border: '5px solid white' } },
            }}
          />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="h1" color="primary.contrastText">
              {name}
            </Typography>

            <Stack mt={0.5} direction="row" spacing={0.5} color="grey.300">
              <CakeIcon color="inherit" sx={{ width: '1rem', height: '1rem' }} />
              <Typography variant="body2" color="inherit">
                Membro {formatDate.distanceToNow(new Date(createdAt))}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Stack p={{ xs: 2, sm: 4 }} spacing={0.5}>
        <Box sx={{ display: { sm: 'none' } }}>
          <Typography component="h1" variant="h2" color="primary.main">
            {name}
          </Typography>

          <Stack mt={1} direction="row" spacing={0.5} color="grey.800">
            <CakeIcon color="inherit" sx={{ width: '1rem', height: '1rem' }} />
            <Typography variant="body2" color="inherit">
              Membro {formatDate.distanceToNow(new Date(createdAt))}
            </Typography>
          </Stack>
        </Box>
        {data?.map(({ icon, value }, index) => (
          <IconData key={index} icon={icon}>
            {value}
          </IconData>
        ))}
      </Stack>
    </Section>
  )
}
