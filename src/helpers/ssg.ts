import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { Session } from 'next-auth'
import SuperJSON from 'superjson'

import { appRouter } from 'src/server/api/root'
import { createInnerTRPCContext } from 'src/server/api/trpc'

export const ssg = (session?: Session | null) =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({
      session: session ?? null,
    }),
    transformer: SuperJSON,
  })

export type SSG = ReturnType<typeof ssg>
