import { createTRPCRouter, protectedProcedure } from '../trpc'

export const proposalRouter = createTRPCRouter({
  // createBySocialSignUp: protectedProcedure.input(proposalRegisterSchema).mutation(async ({ ctx, input }) => {
  //   return ctx.prisma.pro
  // }),
})
