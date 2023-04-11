import { UserType } from 'src/models/enums'
import { BaseUser, CompanyUser, ICTUser } from 'src/models/types'

export const checkUserIsCompany = (user: BaseUser): user is CompanyUser => user.type === UserType.company
export const checkUserIsICT = (user: BaseUser): user is ICTUser => user.type === UserType.ict
