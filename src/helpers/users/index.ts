import { CompanyUser, ICTUser, User } from 'src/models/types'

export const checkUserIsCompany = (user: User): user is CompanyUser => user.type === 'company'
export const checkUserIsICT = (user: User): user is ICTUser => user.type === 'ict'
