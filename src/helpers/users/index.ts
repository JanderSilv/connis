import { CompanyUser, ICTUser, OldUser } from 'src/models/types'

export const checkUserIsCompany = (user: OldUser): user is CompanyUser => user.type === 'company'
export const checkUserIsICT = (user: OldUser): user is ICTUser => user.type === 'ict'
