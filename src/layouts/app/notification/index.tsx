import { Fragment } from 'react'
import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  PopoverProps,
  Typography,
} from '@mui/material'

type NotificationProps = {
  id: number
  title: string
  message: string
  date: string
  action?: () => void
  alreadyRead?: boolean
}

export const Notification = ({ title, message, date, action, alreadyRead }: NotificationProps) => {
  const content = (
    <>
      {!alreadyRead && (
        <ListItemIcon sx={{ minWidth: 20 }}>
          <Badge variant="dot" color="error" />
        </ListItemIcon>
      )}

      <ListItemText>
        <Typography variant="body2" component="h2" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
        <Typography variant="caption" component="time">
          {date}
        </Typography>
      </ListItemText>
    </>
  )

  return !!action ? <ListItemButton onClick={action}>{content}</ListItemButton> : <ListItem>{content}</ListItem>
}

type NotificationPopoverProps = {
  notifications: NotificationProps[]
} & PopoverProps

export const NotificationPopover = ({ notifications, ...rest }: NotificationPopoverProps) => (
  <Popover
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    {...rest}
  >
    {!!notifications.length ? (
      <List sx={{ maxWidth: 370 }}>
        {notifications.map((notification, index) => (
          <Fragment key={notification.id}>
            <Notification {...notification} />
            {notifications.length - 1 !== index && <Divider />}
          </Fragment>
        ))}
      </List>
    ) : (
      <Typography minWidth={250} p={2} textAlign="center" color="text.secondary">
        Nenhuma notificação
      </Typography>
    )}
  </Popover>
)
