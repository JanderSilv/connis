import { useState, useCallback } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { AppBar, AppBarProps, Badge, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'

import { NotificationPopover } from './notification'
import { pages } from 'src/constants'

import { UserAvatar } from 'src/components/shared'
import { NotificationsIcon, NotificationsOutlinedIcon } from 'src/assets/icons'
import { Wrapper } from './styles'

type LayoutProps = AppBarProps

const notificationPopoverId = 'notification-popover'

export const Layout = ({ children, ...rest }: LayoutProps) => {
  const { push } = useRouter()
  const { data: session } = useSession()

  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null)
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

  const menuData = {
    id: 'user-menu',
    buttonId: 'user-menu-button',
    isOpen: !!menuAnchorElement,
  }

  const handleCloseNotificationPopover = useCallback(() => {
    setNotificationAnchorElement(null)
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>Connis</title>
      </Head>

      <AppBar id="back-to-top-anchor" color="transparent" elevation={0} position="static" {...rest}>
        <Toolbar>
          <Box flexGrow={1}>
            <Link href="/">
              <a>
                <Image src="/assets/logo/logo.svg" width="117" height="40" alt="Logo do Connis" draggable="false" />
              </a>
            </Link>
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

            <Box>
              <IconButton
                id={menuData.buttonId}
                aria-haspopup="true"
                aria-controls={menuData.isOpen ? menuData.id : undefined}
                aria-expanded={menuData.isOpen ? 'true' : undefined}
                onClick={event => setMenuAnchorElement(event.currentTarget)}
              >
                <UserAvatar name={session?.user.name || ''} src={session?.user.image} />
              </IconButton>
              <Menu
                id={menuData.id}
                anchorEl={menuAnchorElement}
                open={!!menuAnchorElement}
                onClose={() => setMenuAnchorElement(null)}
                MenuListProps={{
                  'aria-labelledby': menuData.buttonId,
                }}
              >
                <MenuItem onClick={() => push(pages.profile)}>Perfil</MenuItem>
                <MenuItem onClick={() => signOut()}>Sair</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </Wrapper>
  )
}
