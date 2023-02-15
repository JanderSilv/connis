import { useState } from 'react'
import dynamic from 'next/dynamic'
import { EmojiStyle, Props } from 'emoji-picker-react'
import { IconButton, Popover } from '@mui/material'

import { emojiPickerI18nCategories } from './data'

import { MoodIcon } from 'src/assets/icons'

const ReactEmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

type EmojiPickerProps = {
  onEmojiClick?: Props['onEmojiClick']
  emojiPickerProps?: Omit<Props, 'onEmojiClick'>
  popoverProps?: Omit<React.ComponentProps<typeof Popover>, 'open' | 'anchorEl' | 'onClose'>
}

export const EmojiPicker = (props: EmojiPickerProps) => {
  const { onEmojiClick, emojiPickerProps, popoverProps } = props

  const [emojiPickerAnchorElement, setEmojiPickerAnchorElement] = useState<HTMLButtonElement | null>(null)
  const emojiPickerActionsId = !!emojiPickerAnchorElement ? 'emoji-picker-actions' : undefined

  return (
    <>
      <IconButton
        aria-label="Selecionar emoji"
        aria-describedby={emojiPickerActionsId}
        onClick={event => setEmojiPickerAnchorElement(event.currentTarget)}
      >
        <MoodIcon />
      </IconButton>
      <Popover
        id={emojiPickerActionsId}
        open={!!emojiPickerAnchorElement}
        anchorEl={emojiPickerAnchorElement}
        onClose={() => setEmojiPickerAnchorElement(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...popoverProps}
      >
        <ReactEmojiPicker
          onEmojiClick={onEmojiClick}
          categories={emojiPickerI18nCategories}
          emojiStyle={EmojiStyle.NATIVE}
          previewConfig={{
            showPreview: false,
          }}
          searchDisabled
          {...emojiPickerProps}
        />
      </Popover>
    </>
  )
}
