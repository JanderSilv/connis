import { NextPage } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'
import { Button, Container } from '@mui/material'

import { UserType } from 'src/models/enums'
import { Company, User } from 'src/models/types'

import { makeCompanyDataSectionData } from 'src/data/company'
import { formatString } from 'src/helpers/formatters'
import { withSession } from 'src/helpers/auth'
import { companyService } from 'src/services'

import { AnalystsTableSection, DataSection, DataSectionFooter, DeleteProfileSection } from 'src/components/profile'
import { Link } from 'src/components/shared'
import { Layout } from 'src/layouts/app'
import { pages } from 'src/constants'

type CompanyProfilePageProps = {
  company: Company
  user: User | null
  analysts: User[]
}

const CompanyProfilePage: NextPage<CompanyProfilePageProps> = props => {
  const { user, company, analysts } = props

  const { name, createdAt, id, image } = company
  const companyFetchKey = [companyService.baseUrl, company.slug]

  const isUserTheOwner = user?.type === UserType.CompanyAdmin && user.companyId === id

  return (
    <Layout documentTitle={formatString.capitalizeFirstLetters(name)}>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(companyFetchKey)]: company,
          },
        }}
      >
        <Container maxWidth="md" sx={{ pt: 2, pb: 8 }}>
          <DataSection
            name={name}
            createdAt={createdAt}
            avatar={{
              src: image,
              canEdit: isUserTheOwner,
            }}
            entity="company"
            data={makeCompanyDataSectionData(company, isUserTheOwner)}
          >
            <DataSectionFooter justifyContent="flex-end">
              <Button
                component={Link}
                href={`${pages.proposals}?company=${company.slug}`}
                variant="outlined"
                color="primary"
                noEffect
              >
                Ver propostas da empresa
              </Button>
            </DataSectionFooter>
          </DataSection>

          {isUserTheOwner && (
            <>
              <AnalystsTableSection analysts={analysts} />
              <DeleteProfileSection
                user={user}
                entityToDelete="company"
                dialogDescription={
                  <>
                    Connis irá <strong>deletar</strong> todas as suas propostas, ofertas, negociações e todos os
                    recursos que pertencem a sua conta.
                  </>
                }
              />
            </>
          )}
        </Container>
      </SWRConfig>
    </Layout>
  )
}

export default CompanyProfilePage

type Params = {
  slug: string
}

export const getServerSideProps = withSession(async context => {
  const { slug } = context.params as Params

  const { data: companies } = await companyService.getBySlug(slug)

  const company = companies[0]

  if (!company) {
    return {
      notFound: true,
    }
  }

  const baseProps = {
    company,
  }

  if (context.session?.user?.companyId === company.id) {
    const { data: analysts } = await companyService.getAnalysts(company.id)
    return {
      props: {
        ...baseProps,
        analysts,
        user: context.session?.user,
      },
    }
  }

  return {
    props: baseProps,
  }
})
