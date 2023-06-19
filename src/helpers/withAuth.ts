import { AxiosError } from 'axios'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import { destroyCookie } from 'nookies'

import { pages } from 'src/constants'
import { UserType } from 'src/models/enums'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

interface ServerContext extends GetServerSidePropsContext {
  session: Session
}

export type ServerProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  context: ServerContext
) => Promise<GetServerSidePropsResult<P>>

export const withAuth = (getServerSideProps: ServerProps) => async (context: GetServerSidePropsContext) => {
  try {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session)
      return {
        redirect: { permanent: false, destination: pages.login },
      }

    const { user } = session

    if (user.type === UserType.CompanyAdmin && !user.companyId)
      return {
        redirect: { permanent: false, destination: pages.companySignUp },
      }

    const serverSession = { ...context, session }

    return await getServerSideProps(serverSession)
  } catch (err) {
    const error = err as AxiosError
    console.error(error)
    if (error.response?.status === 401) {
      destroyCookie(context, 'next-auth.session-token')
      return {
        redirect: { permanent: false, destination: pages.login },
      }
    }
    throw new Error(error.message, { cause: error })
  }
}
