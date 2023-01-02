import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { unstable_getServerSession } from 'next-auth'

import { pages } from 'src/constants'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

interface ServerContext extends GetServerSidePropsContext {
  session?: Session
}

export type ServerProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  context: ServerContext
) => Promise<GetServerSidePropsResult<P>>

export const withAuth = (getServerSideProps: ServerProps) => async (context: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session)
    return {
      redirect: { permanent: false, destination: pages.login },
    }

  if (!session.user.cnpj)
    return {
      redirect: { permanent: false, destination: pages.socialSignUp },
    }

  const serverSession = { ...context, session }

  return await getServerSideProps(serverSession)
}
