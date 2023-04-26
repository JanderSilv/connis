import { formatCurrency, unformatCurrency } from 'src/helpers/formatters'

describe('Currency Formatter', () => {
  it('should format a number to currency', () => {
    const formattedNumber = formatCurrency(1_000_000)
    expect(formattedNumber).toBe('R$ 1.000.000,00')
  })

  it('should format a number to currency with options', () => {
    const formattedNumber = formatCurrency(1_000_000, { maximumFractionDigits: 0 })
    expect(formattedNumber).toBe('R$ 1.000.000')
  })

  it('should unformat a currency to number', () => {
    const unformattedNumber = unformatCurrency('R$ 1.000,50')
    expect(unformattedNumber).toBe(1_000.5)
  })
})
