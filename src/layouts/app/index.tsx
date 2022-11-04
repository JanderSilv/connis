import { useState, ReactNode, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar } from '@mui/material'

import { NotificationPopover } from './notification'
import { NotificationsIcon, NotificationsOutlinedIcon } from 'src/assets/icons'
import { Wrapper } from './styles'

type LayoutProps = {
  children: ReactNode
}

const notificationPopoverId = 'notification-popover'

export const Layout = ({ children }: LayoutProps) => {
  const [notificationAnchorElement, setNotificationAnchorElement] = useState<HTMLButtonElement | null>(null)
  const [notifications] = useState([
    {
      id: 1,
      title: 'Interesse na proposta',
      message: 'A empresa Connis tem interesse na sua proposta',
      date: '10/10/2021',
    },
    {
      id: 2,
      title: 'Contra Proposta',
      message: 'A empresa Connis fez uma contra proposta',
      date: '10/10/2021',
    },
  ])

  const handleCloseNotificationPopover = useCallback(() => {
    setNotificationAnchorElement(null)
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>Connis</title>
      </Head>

      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <Image src="/assets/logo/logo.svg" width="117" height="40" alt="Logo do Connis" draggable="false" />
          </Box>

          <Box display="flex" alignItems="center" gap={3}>
            <IconButton
              aria-describedby={notificationPopoverId}
              onClick={event => setNotificationAnchorElement(event.currentTarget)}
            >
              <Badge badgeContent={notifications.length} max={9} color="error">
                {!!notifications.length ? (
                  <NotificationsIcon color="primary" />
                ) : (
                  <NotificationsOutlinedIcon color="primary" />
                )}
              </Badge>
            </IconButton>
            <NotificationPopover
              aria-describedby={notificationPopoverId}
              anchorEl={notificationAnchorElement}
              open={!!notificationAnchorElement}
              onClose={handleCloseNotificationPopover}
              notifications={notifications}
            />

            <Avatar alt="Avatar do usuário" sx={{ width: 35, height: 35, bgcolor: 'primary.main' }}>
              {/* <Image src="/assets/avatar/avatar.svg" width="35" height="35" alt="C" /> */}C
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </Wrapper>
  )
}
