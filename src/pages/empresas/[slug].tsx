import { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@mui/material'

import { CompanyUser } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { withSession } from 'src/helpers/auth'
import { formatCNPJ } from 'src/helpers/formatters/cnpj'

import { AnalystsTableSection, DataSection, DeleteProfileSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { AssignmentIcon, BusinessIcon, EmailIcon, PlaceIcon } from 'src/assets/icons'

type CompanyProfilePageProps = {
  profileUser: CompanyUser
  user: CompanyUser | null
}

const CompanyProfilePage: NextPage<CompanyProfilePageProps> = props => {
  const { user, profileUser } = props
  const { name, analysts } = profileUser

  const documentTitle = `${name} - Connis`
  const isTheProfileOwner = user?.id === profileUser.id

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <Container maxWidth="md" sx={{ pt: 2, pb: 8 }}>
        <DataSection
          user={profileUser}
          data={[
            ...(isTheProfileOwner ? [{ icon: EmailIcon, value: profileUser.email }] : []),
            { icon: BusinessIcon, value: formatCNPJ(profileUser.cnpj) },
            { icon: AssignmentIcon, value: profileUser.cnae?.label.split(':: ')[1] },
            { icon: PlaceIcon, value: `${profileUser.address.city} - ${profileUser.address.uf}` },
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

export const getServerSideProps = withSession(async context => {
  const { company } = fakeData
  return {
    props: {
      profileUser: company,
      user: context.session?.user,
    },
  }
})
