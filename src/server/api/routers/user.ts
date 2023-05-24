import { z } from 'zod'
import { UserType } from 'src/models/enums'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { inferRouterOutputs } from '@trpc/server'
import { makeUserInclude } from 'src/server/prisma'
import { mapUser } from 'src/server/mappers'

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.nativeEnum(UserType),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, type } = input

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: makeUserInclude(type),
      })

      if (!user) return null

      return mapUser.fromPrisma(user)
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) =>
    ctx.prisma.user.delete({
      where: {
        id: input,
      },
    })
  ),
})

export type GetUser = inferRouterOutputs<typeof userRouter>['get']
