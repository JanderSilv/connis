import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

export const useChat = () => {
  const [messageText, setMessageText] = useState('')

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)

  const handleEnterKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') sendButtonRef.current?.click()
  }, [])

  const moveScrollToBottom = useCallback(() => {
    if (chatContainerRef.current)
      setTimeout(() => chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight), 0)
  }, [])

  useEffect(() => {
    moveScrollToBottom()
  }, [moveScrollToBottom])

  return {
    messageText,
    setMessageText,
    chatContainerRef,
    sendButtonRef,
    moveScrollToBottom,
    handleEnterKey,
  }
}
