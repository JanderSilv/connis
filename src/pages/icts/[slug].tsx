import { NextPage } from 'next'
import NextLink from 'next/link'
import { SWRConfig, unstable_serialize } from 'swr'
import { Button, Container } from '@mui/material'

import { ICT, User } from 'src/models/types'

import { pages } from 'src/constants'
import { fakeData } from 'src/data/fake'
import { makeICTDataSectionData } from 'src/data/ict'
import { withSession } from 'src/helpers/auth'
import { ictService } from 'src/services'

import {
  AnalystsTableSection,
  DataSection,
  DataSectionFooter,
  DeleteProfileSection,
  LabsSection,
} from 'src/components/profile'
import { Layout } from 'src/layouts/app'

type ICTProfilePageProps = {
  ict: ICT
  user: User | null
}

const ICTProfilePage: NextPage<ICTProfilePageProps> = props => {
  const { user, ict } = props

  const ictFetchKey = [ictService.baseUrl, ict.slug]

  const { id, name, analysts, laboratories } = ict
  const isTheProfileOwner = user?.ictId === id

  return (
    <Layout documentTitle={name}>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(ictFetchKey)]: ict,
          },
        }}
      >
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <DataSection
            name={ict.name}
            createdAt={ict.createdAt}
            avatar={{
              src: ict.image,
              canEdit: isTheProfileOwner,
            }}
            entity="ict"
            data={makeICTDataSectionData(ict!, isTheProfileOwner)}
          >
            <DataSectionFooter justifyContent="flex-end">
              <NextLink
                href={{
                  pathname: `${pages.proposalRegistration}`,
                  query: { research: true },
                }}
                passHref
                legacyBehavior
              >
                <Button component="a" variant="outlined" color="primary">
                  Enviar uma proposta para a ICT
                </Button>
              </NextLink>
            </DataSectionFooter>
          </DataSection>

          {isTheProfileOwner && <AnalystsTableSection analysts={analysts as any} />}
          <LabsSection labs={laboratories} />
          {isTheProfileOwner && <DeleteProfileSection user={user} entityToDelete="ict" />}
        </Container>
      </SWRConfig>
    </Layout>
  )
}

export default ICTProfilePage

type Params = {
  slug: string
}

export const getServerSideProps = withSession(async context => {
  const { slug } = context.params as Params

  const { data: icts } = await ictService.getBySlug(slug)
  const { ict: fakeICT } = fakeData

  return {
    props: {
      ict: {
        ...icts[0],
        laboratories: fakeICT.laboratories,
        analysts: fakeICT.analysts,
      },
      user: context.session?.user,
    },
  }
})
