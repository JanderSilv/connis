import { NextPage } from 'next'
import Link from 'next/link'
import useImmutableSWR from 'swr/immutable'
import { Button, Collapse, Container } from '@mui/material'

import { User } from 'src/models/types'

import { pages } from 'src/constants'
import { makeCompanyDataSectionData } from 'src/data/company'
import { withSession } from 'src/helpers/auth'
import { companyService, ictService, userService } from 'src/services'

import { DataSection, DataSectionFooter, DeleteProfileSection } from 'src/components/profile'
import { Layout } from 'src/layouts/app'

import { EmailIcon, PersonIcon } from 'src/assets/icons'
import { makeICTDataSectionData } from 'src/data/ict'
import { UserType } from 'src/models/enums'

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
  const { data: company } = useImmutableSWR(
    isUserTheOwner && !!profileUser.companyId ? `${companyService.baseUrl}/${profileUser.companyId}` : null,
    companyService.getFetcher
  )
  const { data: ict } = useImmutableSWR(
    isUserTheOwner && !!profileUser.ictId ? `${ictService.baseUrl}/${profileUser.ictId}` : null,
    ictService.getFetcher
  )

  const { name, createdAt, image, email } = profileUser
  const organization = ict || company

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

        {!!organization && (
          <Collapse in={!!organization}>
            <DataSection
              name={organization!.name}
              createdAt={''}
              avatar={{
                src: organization!.image,
              }}
              data={
                !!company
                  ? makeCompanyDataSectionData(company!, isUserTheOwner, [
                      {
                        icon: PersonIcon,
                        value: profileUser.type === UserType.CompanyAdmin ? 'Administrador' : 'Analista',
                        order: 0,
                      },
                    ])
                  : makeICTDataSectionData(ict!, isUserTheOwner, [
                      {
                        icon: PersonIcon,
                        value: profileUser.type === UserType.ICTAdmin ? 'Administrador' : 'Analista',
                        order: 0,
                      },
                    ])
              }
              componentProps={{
                wrapper: {
                  sx: {
                    mt: 3,
                  },
                },
              }}
            >
              <DataSectionFooter justifyContent="flex-end">
                <Button
                  component={Link}
                  href={!!company ? `${pages.companyProfile}/${company?.slug}` : `${pages.ictProfile}/${ict?.slug}`}
                  variant="outlined"
                >
                  Ver perfil da organização
                </Button>
              </DataSectionFooter>
            </DataSection>
          </Collapse>
        )}

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
}

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
