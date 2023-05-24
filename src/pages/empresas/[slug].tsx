import { NextPage } from 'next'
import { Container } from '@mui/material'

import { CompanyUser } from 'src/models/types'

import { withSession } from 'src/helpers/auth'
import { formatCNPJ } from 'src/helpers/formatters/cnpj'

import { AnalystsTableSection, DataSection, DeleteProfileSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { AssignmentIcon, BusinessIcon, EmailIcon, PlaceIcon } from 'src/assets/icons'
import { ParsedUrlQuery } from 'querystring'
import { UserType } from 'src/models/enums'
import { api } from 'src/services/api'

type CompanyProfilePageProps = {
  id: string
  user: CompanyUser | null
}

const CompanyProfilePage: NextPage<CompanyProfilePageProps> = props => {
  const { user, id } = props

  const profileUser = api.user.get.useQuery({ id, type: UserType.company }).data

  if (profileUser?.type !== UserType.company) return null

  const { name, analysts } = profileUser

  const isTheProfileOwner = user?.id === profileUser.id

  return (
    <Layout documentTitle={name}>
      <Container maxWidth="md" sx={{ pt: 2, pb: 8 }}>
        <DataSection
          user={profileUser}
          data={[
            ...(isTheProfileOwner ? [{ icon: EmailIcon, value: profileUser.email }] : []),
            { icon: BusinessIcon, value: formatCNPJ(profileUser.cnpj) },
            { icon: AssignmentIcon, value: profileUser.cnae?.label.split(': ')[1] },
            {
              icon: PlaceIcon,
              value: `${profileUser.address.city.toLowerCase()} - ${profileUser.address.uf}`,
              sx: { textTransform: 'capitalize' },
            },
          ]}
        />

        {isTheProfileOwner && (
          <>
            <AnalystsTableSection analysts={analysts} />
            <DeleteProfileSection
              user={user}
              dialogDescription={
                <>
                  Connis irá <strong>deletar</strong> todas as suas propostas, ofertas, negociações e todos os recursos
                  que pertencem a sua conta.
                </>
              }
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default CompanyProfilePage

type Params = {
  slug: string
} & ParsedUrlQuery

export const getServerSideProps = withSession(async context => {
  const { params, session, ssg } = context

  const { slug } = params as Params

  const userId = await ssg.company.getUserIdBySlug.fetch(slug)

  if (!userId) return { notFound: true }

  await ssg.user.get.prefetch({ id: userId, type: UserType.company })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: userId,
      user: session?.user || null,
    },
  }
})
