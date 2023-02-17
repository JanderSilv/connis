import { useState } from 'react'
import { SvgIcon } from '@mui/material'

export type Tab = {
  label: string
  icon: typeof SvgIcon
}

const a11yTabProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
})

export const useTab = (tabs: Tab[]) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue)

  return {
    tabs,
    selectedTab,
    handleChangeTab,
    a11yTabProps,
  }
}
