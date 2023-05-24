import { Prisma } from '@prisma/client'
import { UserType } from 'src/models/enums'

export const makeUserInclude = (type: UserType) =>
  Prisma.validator<Prisma.UserInclude>()({
    company:
      type === UserType.company
        ? {
            include: {
              cnae: true,
              address: true,
              analysts: {
                include: {
                  user: true,
                },
              },
            },
          }
        : false,
    ict:
      type === UserType.ict
        ? {
            include: {
              address: true,
              analysts: {
                include: {
                  user: true,
                },
              },
              projects: {
                include: {
                  image: true,
                },
              },
              labs: {
                include: {
                  images: true,
                },
              },
            },
          }
        : false,
  })

export type UserPayload = Prisma.UserGetPayload<{
  include: ReturnType<typeof makeUserInclude>
}>
