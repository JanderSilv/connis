import { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@mui/material'

import { ICTUser } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { withSession } from 'src/helpers/auth'
import { formatCNPJ } from 'src/helpers/formatters/cnpj'

import { Link } from 'src/components/shared'
import { AnalystsTableSection, DataSection, DeleteProfileSection, LabsSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { BusinessIcon, EmailIcon, LanguageIcon, PlaceIcon } from 'src/assets/icons'

type ICTProfilePageProps = {
  profileUser: ICTUser
  user: ICTUser | null
}

const ICTProfilePage: NextPage<ICTProfilePageProps> = props => {
  const { user, profileUser } = props
  const { name, analysts, labs } = profileUser

  const documentTitle = `${name} - Connis`
  const isTheProfileOwner = user?.id === profileUser.id

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 2 }}>
        <DataSection
          user={profileUser}
          data={[
            ...(isTheProfileOwner ? [{ icon: EmailIcon, value: profileUser.email }] : []),
            ...(!!profileUser.website
              ? [{ icon: LanguageIcon, value: <Link href={profileUser.website}>{profileUser.website}</Link> }]
              : []),
            { icon: BusinessIcon, value: formatCNPJ(profileUser.cnpj) },
            { icon: PlaceIcon, value: `${profileUser.address.city} - ${profileUser.address.uf}` },
          ]}
        />

        {isTheProfileOwner && <AnalystsTableSection analysts={analysts} />}
        <LabsSection labs={labs} />
        {isTheProfileOwner && <DeleteProfileSection user={user} />}
      </Container>
    </Layout>
  )
}

export default ICTProfilePage

export const getServerSideProps = withSession(async context => {
  // TODO: get user from database
  const { ict } = fakeData
  return {
    props: {
      profileUser: ict,
      user: context.session?.user,
    },
  }
})
