import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'
import { fakeData } from 'src/data/fake'

const { company, ict } = fakeData
describe('Users helper', () => {
  it('should check if user is a company', () => {
    const userIsCompany = checkUserIsCompany(company)
    expect(userIsCompany).toBe(true)
  })
  it('should check if user is a ICT', () => {
    const userIsICT = checkUserIsICT(ict)
    expect(userIsICT).toBe(true)
  })
})
