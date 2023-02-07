import { Box, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { formatDate } from 'src/helpers/formatters'
import { ChatMessage } from 'src/models/types'
import { Container } from './styles'

type MessageProps = {
  previousMessageUserId?: number
  nextMessageUserId?: number
} & ChatMessage

export const Message = (props: MessageProps) => {
  const { user, content, previousMessageUserId, nextMessageUserId } = props
  const { data: session } = useSession()

  const isTheUser = session?.user?.id === user.id
  const isThePreviousMessageUserTheSame = previousMessageUserId === user.id
  const isTheNextMessageUserTheSame = nextMessageUserId === user.id

  return (
    <Box
      sx={{
        marginBottom: 0.5,
      }}
    >
      <Box
        width="fit-content"
        sx={{
          marginLeft: isTheUser ? 'auto' : undefined,
        }}
      >
        <Container isTheUser={isTheUser} withoutArrow={isThePreviousMessageUserTheSame}>
          <Typography variant="body2" color={isTheUser ? 'primary.contrastText' : undefined}>
            {content}
          </Typography>
        </Container>
        {!isTheNextMessageUserTheSame && (
          <Typography
            component="time"
            variant="caption"
            sx={{
              width: '100%',
              color: 'text.secondary',
              display: 'inline-block',
              textAlign: 'right',
            }}
          >
            {formatDate.distanceToNow(new Date(props.createdAt))}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
