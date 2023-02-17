import { formatNumber } from 'src/helpers/formatters'

describe('Number Formatter', () => {
  it('should format date to distance to now', () => {
    const formattedNumber = formatNumber(1_000_000)
    expect(formattedNumber).toBe('1 milhão')
  })
})
