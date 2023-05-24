import { BaseUser, User } from 'src/models/types'
import { mapUserType } from './type'
import { UserType } from 'src/models/enums'
import { UserPayload } from '../../prisma'

import { mapCompanySize } from '../company'
import { mapImage } from '../images'

export * from './type'

type NullishUser = User | null

const mapUserFromPrisma = (user: UserPayload): NullishUser => {
  if (!user) return null

  const userType = mapUserType.fromPrisma(user.type)

  const baseUser: BaseUser = {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    image: user.image || '',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    emailVerified: user.emailVerified,
    type: userType,
  }

  const mapCompanyUser = (): NullishUser => {
    if (!user.company || !('cnae' in user.company) || !('address' in user.company)) return null

    const { id, cnaeCode, userId, analysts, cnae, address, size, ...company } = user.company

    if (!address) return null

    return {
      ...baseUser,
      ...company,
      type: UserType.company,
      size: mapCompanySize.fromPrisma(size),
      cnae: {
        id: cnae.code,
        label: cnae.label,
      },
      address: address,
      analysts: analysts.map(analyst => {
        const { user } = analyst
        return {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          type: UserType.analyst,
        }
      }),
    }
  }

  const mapIctUser = (): NullishUser => {
    if (!user.ict || !('address' in user.ict)) return null

    const { id, addressId, userId, website, projects, labs, analysts, address, ...ict } = user.ict

    return {
      ...baseUser,
      ...ict,
      type: UserType.ict,
      website: website || undefined,
      projects: projects.map(({ image, ...project }) => ({
        ...project,
        image: image ? mapImage.fromPrisma(image) : undefined,
      })),
      labs: labs.map(({ images, ...lab }) => ({
        ...lab,
        images: images.map(image => mapImage.fromPrisma(image)),
      })),
      analysts: analysts.map(analyst => {
        const { user } = analyst
        return {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          type: UserType.analyst,
        }
      }),
      address: {
        ...address,
        complement: address.complement || undefined,
      },
    }
  }

  const mapAnalystUser = (): NullishUser => ({
    ...baseUser,
    type: UserType.analyst,
  })

  const maps = {
    [UserType.company]: mapCompanyUser,
    [UserType.ict]: mapIctUser,
    [UserType.analyst]: mapAnalystUser,
  }

  return maps[userType]()
}

export const mapUser = {
  fromPrisma: mapUserFromPrisma,
}
