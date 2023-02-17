import { useState } from 'react'
import { IconButton, Popover, Stack, Typography } from '@mui/material'
import { InfoIcon } from 'src/assets/icons'

type ActionsHeaderProps = {
  children: React.ReactNode
}

export const ActionsHeader = (props: ActionsHeaderProps) => {
  const { children } = props
  const [helpButtonAnchorElement, setHelpButtonAnchorElement] = useState<HTMLButtonElement | null>(null)
  const helpPopoverActionsId = !!helpButtonAnchorElement ? 'help-popover-actions' : undefined

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h5" component="h3" fontWeight="500">
        Ações
      </Typography>
      <IconButton
        aria-describedby={helpPopoverActionsId}
        onClick={event => setHelpButtonAnchorElement(event.currentTarget)}
      >
        <InfoIcon fontSize="small" />
      </IconButton>
      <Popover
        id={helpPopoverActionsId}
        open={!!helpButtonAnchorElement}
        anchorEl={helpButtonAnchorElement}
        onClose={() => setHelpButtonAnchorElement(null)}
        PaperProps={{
          sx: {
            paddingRight: 2,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </Stack>
  )
}
