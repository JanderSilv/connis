import { formatString } from 'src/helpers/formatters/string'

describe('String formatter', () => {
  it('should capitalize first letter', () => {
    const capitalizedString = formatString.capitalizeFirstLetter('proposal')
    expect(capitalizedString).toBe('Proposal')
  })
})
