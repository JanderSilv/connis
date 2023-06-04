import { UserType } from 'src/models/enums'
import { User } from 'src/models/types'

export const checkUserIsCompany = (user?: User) =>
  !!user ? [UserType.CompanyAdmin, UserType.CompanyAnalyst].includes(user.type) : false

export const checkUserIsICT = (user?: User) =>
  !!user ? [UserType.ICTAdmin, UserType.ICTAnalyst].includes(user.type) : false
