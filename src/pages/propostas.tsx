import { GetStaticProps, NextPage } from 'next'
import axios from 'axios'
import { Proposal } from 'src/models/types'

type Props = {
  proposals: Proposal[]
}

const Proposals: NextPage<Props> = ({ proposals }) => {
  return <pre>{JSON.stringify(proposals, null, 2)}</pre>
}

export default Proposals

export const getStaticProps: GetStaticProps = async () => {
  const fs = (await import('fs')).default
  const proposals: Proposal[] = JSON.parse(fs.readFileSync('src/data/proposals/proposals.json', 'utf8'))

  return {
    props: {
      proposals,
    },
    revalidate: 60, // 1 minute
  }
}
