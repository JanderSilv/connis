import { BottomNavigationAction, Slide } from '@mui/material'
import { TabType } from 'src/hooks/proposal'
import { BottomNavigation } from './styles'

type MobileNavigationProps = {
  tabs: TabType[]
  selectedTab: number
  handleChangeTab: (_: React.SyntheticEvent, newValue: number) => void
  scrollTrigger: boolean
}

export const MobileNavigation = ({ selectedTab, handleChangeTab, scrollTrigger, tabs }: MobileNavigationProps) => {
  return (
    <Slide appear={false} direction="up" in={!scrollTrigger}>
      <BottomNavigation
        value={selectedTab}
        onChange={(_, newValue) => {
          handleChangeTab(_, newValue)
          window.scrollTo({ top: 0 })
        }}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels
      >
        {tabs.map(({ icon: TabIcon, label }) => (
          <BottomNavigationAction key={label} label={label} icon={<TabIcon />} />
        ))}
      </BottomNavigation>
    </Slide>
  )
}
