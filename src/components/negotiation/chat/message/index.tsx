import { Box, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { formatDate } from 'src/helpers/formatters'
import { checkHasOnlyOneEmoji } from '../helpers'
import { ChatMessage, User } from 'src/models/types'

import { Container } from './styles'

type MessageProps = {
  previousMessageUserId?: User['id']
  nextMessageUserId?: User['id']
} & ChatMessage

export const Message = (props: MessageProps) => {
  const { user, content, previousMessageUserId, nextMessageUserId } = props
  const { data: session } = useSession()

  const isTheUser = session?.user?.id === user.id
  const isThePreviousMessageUserTheSame = previousMessageUserId === user.id
  const isTheNextMessageUserTheSame = nextMessageUserId === user.id

  return (
    <Box mb={0.5}>
      <Stack alignItems={isTheUser ? 'flex-end' : 'flex-start'}>
        <Box maxWidth="65%">
          <Container isTheUser={isTheUser} withoutArrow={isThePreviousMessageUserTheSame}>
            <Typography
              variant="body2"
              color={isTheUser ? 'primary.contrastText' : undefined}
              fontSize={checkHasOnlyOneEmoji(content) ? 32 : undefined}
            >
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
                textAlign: isTheUser ? 'right' : 'left',
              }}
            >
              {formatDate.distanceToNow(new Date(props.createdAt))}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  )
}
