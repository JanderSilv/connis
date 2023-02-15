import { useEffect, useRef, useState } from 'react'

export const useChat = () => {
  const [messageText, setMessageText] = useState('')

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveScrollToBottom = () => {
      if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    moveScrollToBottom()
  }, [])

  return {
    messageText,
    setMessageText,
    chatContainerRef,
  }
}
