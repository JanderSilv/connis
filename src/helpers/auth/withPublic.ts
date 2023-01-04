import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { pages } from 'src/constants'
import { ServerProps } from 'src/models/types/auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

export const withPublic = (getServerSideProps: ServerProps) => async (context: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session)
    return {
      redirect: {
        destination: pages.home,
        permanent: false,
      },
    }

  return await getServerSideProps(context)
}
