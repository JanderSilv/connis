import { CompanyUser, User } from 'src/models/types'

export const checkUserIsCompany = (user: User): user is CompanyUser => user.type === 'company'
