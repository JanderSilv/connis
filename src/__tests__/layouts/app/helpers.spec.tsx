import { fakeData } from 'src/data/fake'
import { getProfileURL } from 'src/layouts/app/helpers'

const { company, ict, analyst } = fakeData

describe('getProfileURL - App Layout Helpers', () => {
  it('should return the company profile url', () => {
    expect(getProfileURL(company)).toBe('/empresas/empresa-ofertante')
  })
  it('should return the ict profile url', () => {
    expect(getProfileURL(ict)).toBe('/icts/senai-cimatec')
  })
  it('should return the analyst profile url', () => {
    expect(getProfileURL(analyst)).toBe('/analistas/analista')
  })
})
