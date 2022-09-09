// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Proposal } from 'src/models/types'

const proposalsPath = path.join(process.cwd(), 'src', 'data', 'proposals', 'proposals.json')

export default function handler(req: NextApiRequest, res: NextApiResponse<Proposal | Proposal[]>) {
  if (req.method === 'GET') {
    const proposals = JSON.parse(fs.readFileSync(proposalsPath, 'utf8')) as Proposal[]
    res.status(200).json(proposals)
  } else if (req.method === 'POST') {
    const proposal: Proposal = req.body
    const fileBuffer = fs.readFileSync(proposalsPath, 'utf8')
    const data = JSON.parse(fileBuffer)
    fs.writeFileSync(`${proposalsPath}`, JSON.stringify([...data, proposal], null, 2))
    res.status(200).json(proposal)
  }
}
