import { GetServerSideProps, NextPage } from 'next'
import { Container } from '@mui/material'

import { AnalystUser } from 'src/models/types'

import { fakeData } from 'src/data/fake'
import { withSession } from 'src/helpers/auth'

import { DataSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { EmailIcon } from 'src/assets/icons'

type AnalystProfilePageProps = {
  profileUser: AnalystUser
  user: AnalystUser | null
}

const AnalystProfilePage: NextPage<AnalystProfilePageProps> = props => {
  const { profileUser, user } = props
  const { name } = profileUser

  const isTheProfileOwner = user?.id === profileUser.id

  return (
    <Layout documentTitle={name}>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <DataSection
          user={profileUser}
          data={isTheProfileOwner ? [{ icon: EmailIcon, value: profileUser.email }] : []}
        />
      </Container>
    </Layout>
  )
}

export default AnalystProfilePage

export const getServerSideProps: GetServerSideProps = withSession(async context => {
  // TODO: fetch analyst data from database
  const { analyst } = fakeData
  return {
    props: {
      profileUser: analyst,
      user: context.session?.user,
    },
  }
})
