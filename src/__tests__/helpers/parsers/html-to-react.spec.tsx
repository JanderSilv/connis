import { render, screen } from '@testing-library/react'
import { parseHTMLToReact } from 'src/helpers/parsers/html-to-react'

describe('HTML to React Parser', () => {
  it('should return a react component', () => {
    const html = '<h1>Test</h1>'
    const component = parseHTMLToReact(html)
    render(<>{component}</>)
    const title = screen.getByRole('heading', { name: /Test/i })
    expect(title).toBeInTheDocument()
  })
})
