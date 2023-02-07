import { Box, IconButton, InputAdornment, TextField } from '@mui/material'

import { ChatMessage } from 'src/models/types'

import { Message } from './message'

import { MoodIcon, SendIcon } from 'src/assets/icons'
import { Container } from './styles'

type ChatProps = {
  messages: ChatMessage[]
}

export const Chat = (props: ChatProps) => {
  const { messages } = props
  return (
    <Box>
      <Container>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            previousMessageUserId={messages[index - 1]?.user.id}
            nextMessageUserId={messages[index + 1]?.user.id}
            {...message}
          />
        ))}
      </Container>
      <TextField
        variant="filled"
        placeholder="Mensagem"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <MoodIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiFilledInput-underline': {
            borderRadius: '0 0 10px 10px',
            overflow: 'hidden',
            '&:before': {
              borderRadius: '0 0 10px 10px',
            },
          },
        }}
        hiddenLabel
        fullWidth
      />
    </Box>
  )
}
