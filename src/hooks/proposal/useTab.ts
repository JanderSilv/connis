import { useState } from 'react'
import { BusinessIcon, DescriptionIcon } from 'src/assets/icons'

const tabs = [
  {
    label: 'Proposta',
    icon: DescriptionIcon,
  },
  {
    label: 'Empresas Interessadas',
    icon: BusinessIcon,
  },
]

export type TabType = typeof tabs[number]

const a11yTabProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
})

export const useTab = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue)

  return {
    tabs,
    selectedTab,
    handleChangeTab,
    a11yTabProps,
  }
}
