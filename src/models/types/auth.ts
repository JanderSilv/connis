import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export type ServerProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>>
