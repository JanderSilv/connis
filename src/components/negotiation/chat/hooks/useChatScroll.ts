import { RefObject, useEffect, useRef } from 'react'

export const useChatScroll = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveScrollToBottom = () => {
      if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    moveScrollToBottom()
  }, [])

  return {
    chatContainerRef,
  }
}
