import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Box, Theme, useMediaQuery } from '@mui/material'

import { fakeData } from 'src/data/fake'
import { Company, Proposal } from 'src/models/types'

import { Layout } from 'src/layouts/app'
import {
  ProposalDataSectionOne,
  ProposalDataSectionTwo,
  ProposalDataSectionThree,
  AsideContentOwner,
  AsideContentCompany,
} from 'src/components/proposal'
import { ScrollTop } from 'src/components/shared'
import { ProposalTitle, Section, Wrapper } from 'src/styles/proposal'

type Props = {
  proposal: {
    company: Company
  } & Proposal
}

const { userCompany } = fakeData

const ProposalPage: NextPage<Props> = ({ proposal }) => {
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))

  const documentTitle = `Proposta ${proposal.id} - Connis`
  const company = proposal.company
  const isTheOwner = userCompany.id === company.id

  return (
    <Layout>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <ProposalTitle>{proposal.title}</ProposalTitle>

      <Wrapper maxWidth="xl">
        <Box component="main" flex={1}>
          <ProposalDataSectionOne {...proposal} />
          <ProposalDataSectionTwo {...proposal} />
          <ProposalDataSectionThree {...proposal} />
        </Box>

        <Box component="aside" flex={isTheOwner ? 0.3 : 0.4} position="relative">
          <Section sx={{ position: 'sticky', top: 32 }}>
            {(() => {
              if (isTheOwner) return <AsideContentOwner {...proposal} />
              else return <AsideContentCompany {...company} />
            })()}
          </Section>
        </Box>
      </Wrapper>

      <ScrollTop showCondition={isMobile} />
    </Layout>
  )
}

export default ProposalPage

type Params = {
  id: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as Params

  console.log({ id })

  const { proposal, company } = fakeData

  return {
    props: {
      proposal: {
        ...proposal,
        company,
      },
    },
  }
}
