import { formatDate } from 'src/helpers/formatters'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

beforeAll(() => {
  setDefaultOptions({ locale: ptBR })
})

describe('Date Formatter', () => {
  it('should format date to distance to now', () => {
    const formattedDate = formatDate.distanceToNow(new Date())
    expect(formattedDate).toBe('há menos de um minuto')
  })
  it('should format date to long date', () => {
    const formattedDate = formatDate.longDate(new Date('2023-01-16T03:24:00'))
    expect(formattedDate).toBe('16 de Janeiro de 2023')
  })
})
