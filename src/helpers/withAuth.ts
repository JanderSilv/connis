import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth'

import { pages } from 'src/constants'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'
import { checkUserIsCompany } from './users'

interface ServerContext extends GetServerSidePropsContext {
  session: Session
}

export type ServerProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  context: ServerContext
) => Promise<GetServerSidePropsResult<P>>

export const withAuth = (getServerSideProps: ServerProps) => async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session)
    return {
      redirect: { permanent: false, destination: pages.login },
    }

  const checkIfCompanyUserHasCnpj = () => {
    if (checkUserIsCompany(session.user) && !session.user.cnpj)
      return {
        redirect: { permanent: false, destination: pages.companySocialSignUp },
      }
  }

  checkIfCompanyUserHasCnpj()

  const serverSession = { ...context, session }

  return await getServerSideProps(serverSession)
}
