import { createTRPCRouter } from './trpc'
import { companyRouter, userRouter } from './routers'

export const appRouter = createTRPCRouter({
  company: companyRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
