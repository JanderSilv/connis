import { fireEvent, render, screen, renderHook, act } from '@testing-library/react'

import { BusinessIcon, DescriptionIcon } from 'src/assets/icons'
import { useTab } from 'src/hooks/proposal'
import { Tab, Tabs } from 'src/styles/proposal'

describe('useTab', () => {
  it('should render tab', () => {
    const { result: useTabResult } = renderHook(() =>
      useTab([
        {
          label: 'Proposta',
          icon: DescriptionIcon,
        },
        {
          label: 'Empresas Interessadas',
          icon: BusinessIcon,
        },
      ])
    )
    const { selectedTab, tabs, handleChangeTab, a11yTabProps } = useTabResult.current
    render(
      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
        {tabs.map(({ label }, index) => (
          <Tab key={label} label={label} {...a11yTabProps(index)} data-testid={`tab-${index}`} />
        ))}
      </Tabs>
    )

    const tab = screen.getByText('Proposta')
    expect(tab).toBeInTheDocument()
  })

  it('should change tab', () => {
    const { result: useTabResult } = renderHook(() =>
      useTab([
        {
          label: 'Proposta',
          icon: DescriptionIcon,
        },
        {
          label: 'Empresas Interessadas',
          icon: BusinessIcon,
        },
      ])
    )
    const { selectedTab, tabs, handleChangeTab, a11yTabProps } = useTabResult.current
    render(
      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="Abas de Navegação" centered>
        {tabs.map(({ label }, index) => (
          <Tab key={label} label={label} {...a11yTabProps(index)} data-testid={`tab-${index}`} />
        ))}
      </Tabs>
    )

    const tab = screen.getByTestId('tab-1')
    act(() => {
      fireEvent.click(tab)
    })
    expect(useTabResult.current.selectedTab).toBe(1)
  })
})
