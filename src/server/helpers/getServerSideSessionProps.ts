import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

export const getServerAuthSession = (context: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => getServerSession(context.req, context.res, authOptions)
