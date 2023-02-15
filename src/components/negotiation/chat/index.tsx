import { useState } from 'react'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'

import { ChatMessage, User } from 'src/models/types'

import { useChat } from './hooks/useChat'

import { EmojiPicker } from './emoji-picker'
import { Message } from './message'

import { SendIcon } from 'src/assets/icons'
import { Container } from './styles'

type ChatProps = {
  messages: ChatMessage[]
  user: User
}

export const Chat = (props: ChatProps) => {
  const { messages: initialMessages, user } = props

  const { messageText, setMessageText, chatContainerRef, moveScrollToBottom, handleEnterKey, sendButtonRef } = useChat()

  const [messages, setMessages] = useState(initialMessages)

  return (
    <Box>
      <Container ref={chatContainerRef}>
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
        value={messageText}
        onChange={event => setMessageText(event.target.value)}
        inputProps={{ onKeyPress: handleEnterKey }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmojiPicker onEmojiClick={emoji => setMessageText(`${messageText}${emoji.emoji}`)} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Enviar mensagem"
                ref={sendButtonRef}
                onClick={() => {
                  setMessages([...messages, { id: 1, createdAt: new Date().toISOString(), user, content: messageText }])
                  setMessageText('')
                  moveScrollToBottom()
                }}
                disabled={!messageText}
              >
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
