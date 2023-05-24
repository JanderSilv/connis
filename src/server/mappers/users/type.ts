import { UserType } from 'src/models/enums'

type UserTypeKey = keyof typeof UserType

const mapUserTypeToPrisma = (userType: UserType): UserTypeKey => {
  const userTypeMap: Record<UserType, UserTypeKey> = {
    [UserType.company]: 'company',
    [UserType.ict]: 'ict',
    [UserType.analyst]: 'analyst',
  }

  return userTypeMap[userType]
}

const mapUserTypeFromPrisma = (userType: string): UserType => {
  const userTypeMap: Record<UserTypeKey, UserType> = {
    ['company']: UserType.company,
    ['ict']: UserType.ict,
    ['analyst']: UserType.analyst,
  }

  return userTypeMap[userType as UserTypeKey]
}

export const mapUserType = {
  toPrisma: mapUserTypeToPrisma,
  fromPrisma: mapUserTypeFromPrisma,
}
