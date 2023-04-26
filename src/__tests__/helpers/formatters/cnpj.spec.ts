import { formatCNPJ } from 'src/helpers/formatters'

describe('CNPJ Formatter', () => {
  it('should format CNPJ to distance to now', () => {
    const formattedCNPJ = formatCNPJ('12345678901234')
    expect(formattedCNPJ).toBe('12.345.678/9012-34')
  })
})
