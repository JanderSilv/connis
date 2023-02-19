import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

interface ServerContext extends GetServerSidePropsContext {
  session?: Session | null
}

export type ServerProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  context: ServerContext
) => Promise<GetServerSidePropsResult<P>>

export const withSession = (getServerSideProps: ServerProps) => async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const serverSession = { ...context, session }

  return await getServerSideProps(serverSession)
}
