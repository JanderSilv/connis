import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { slugify } from 'src/server/helpers'
import { mapCompanySize } from 'src/server/mappers'
import { companySocialSignUpValidationSchema } from 'src/validations/company-sign-up'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const companyRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  ),

  getUserIdBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const response = await ctx.prisma.company.findUnique({
      where: {
        slug: input,
      },
      select: {
        userId: true,
      },
    })

    return response?.userId ?? null
  }),

  createBySocialSignUp: protectedProcedure
    .input(companySocialSignUpValidationSchema)
    .mutation(async ({ ctx, input }) => {
      const { size, cnae, address, cnpj, phone, socialCapital } = input

      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            company: {
              create: {
                socialCapital,
                phone,
                cnpj,
                slug: slugify(input.name),
                size: mapCompanySize.toPrisma(size),
                cnae: {
                  connect: {
                    code: cnae.id,
                  },
                },
                address: {
                  create: address,
                },
              },
            },
          },
        })

        return user
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Este CNPJ já foi cadastrado. Caso seja sua empresa, entre em contato com o suporte.',
              cause: error,
            })
          }
        }
        throw error
      }
    }),
})
