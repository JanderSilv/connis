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
  const { data } = await axios.get<Proposal[]>('http://localhost:3000/api/proposals')

  return {
    props: {
      proposals: data,
    },
    revalidate: 60, // 1 minute
  }
}
