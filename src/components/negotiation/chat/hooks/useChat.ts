import { useCallback, useEffect, useRef, useState } from 'react'

export const useChat = () => {
  const [messageText, setMessageText] = useState('')

  const chatContainerRef = useRef<HTMLDivElement>(null)

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
    moveScrollToBottom,
  }
}
