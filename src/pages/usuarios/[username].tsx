import { NextPage } from 'next'
import useImmutableSWR from 'swr/immutable'
import { ParsedUrlQuery } from 'querystring'
import { Container } from '@mui/material'

import { User } from 'src/models/types'

import { withSession } from 'src/helpers/auth'

import { DataSection, DeleteProfileSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { EmailIcon } from 'src/assets/icons'
import { userService } from 'src/services'

type AnalystProfilePageProps = {
  initialProfileUser: User
  isUserTheOwner: boolean
}

const UserProfilePage: NextPage<AnalystProfilePageProps> = props => {
  const { initialProfileUser, isUserTheOwner } = props

  const { data: profileUser } = useImmutableSWR(
    `${userService.baseUrl}/${initialProfileUser.id}`,
    userService.getByUsernameFetcher,
    {
      fallbackData: initialProfileUser,
    }
  )

  const { name, createdAt, image, email } = profileUser

  return (
    <Layout documentTitle={name}>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <DataSection
          name={name}
          createdAt={createdAt}
          avatar={{
            src: image,
            canEdit: isUserTheOwner,
          }}
          data={isUserTheOwner ? [{ icon: EmailIcon, value: email }] : []}
        />

        {isUserTheOwner && (
          <>
            <DeleteProfileSection
              user={profileUser}
              entityToDelete="user"
              dialogDescription={
                <>
                  Connis irá <strong>deletar</strong> a organização e dados relacionados a ela.
                </>
              }
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default UserProfilePage

type Params = {
  username: string
} & ParsedUrlQuery

export const getServerSideProps = withSession(async context => {
  const { username } = context.params as Params

  const { session } = context

  if (username === session?.user.userName)
    return {
      props: {
        initialProfileUser: session!.user,
        isUserTheOwner: true,
      },
    }

  const { data } = await userService.getByUsername(username)

  if (!data || data.length === 0)
    return {
      notFound: true,
    }

  return {
    props: {
      initialProfileUser: data[0],
      isUserTheOwner: false,
    },
  }
})
