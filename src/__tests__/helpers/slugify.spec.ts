import { slugify } from 'src/helpers/slugify'

describe('Slugify Helper', () => {
  it('should slugify string', () => {
    const slug = slugify('User Company')
    expect(slug).toBe('user-company')
  })
})
