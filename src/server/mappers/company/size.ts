import { CompanySize as CompanySizeSchema } from '@prisma/client'

import { CompanySize } from 'src/models/enums'

const mapCompanySizeToPrisma = (size: CompanySize): CompanySizeSchema => {
  const sizeMap = {
    [CompanySize.micro]: CompanySizeSchema.MICRO,
    [CompanySize.small]: CompanySizeSchema.SMALL,
    [CompanySize.others]: CompanySizeSchema.OTHERS,
  }

  return sizeMap[size]
}

const mapCompanySizeFromPrisma = (size: CompanySizeSchema): CompanySize => {
  const sizeMap = {
    [CompanySizeSchema.MICRO]: CompanySize.micro,
    [CompanySizeSchema.SMALL]: CompanySize.small,
    [CompanySizeSchema.OTHERS]: CompanySize.others,
  }

  return sizeMap[size]
}

export const mapCompanySize = {
  toPrisma: mapCompanySizeToPrisma,
  fromPrisma: mapCompanySizeFromPrisma,
}
