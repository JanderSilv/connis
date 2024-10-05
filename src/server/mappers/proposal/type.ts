import { ProposalType as PrismaProposalType } from '@prisma/client'

import { ProposalType } from 'src/models/enums'

const mapProposalTypeToPrisma = (type: ProposalType): PrismaProposalType => {
  const typeMap = {
    [ProposalType.buyOrSell]: PrismaProposalType.BUY_OR_SELL,
    [ProposalType.donate]: PrismaProposalType.DONATE,
    [ProposalType.exchange]: PrismaProposalType.EXCHANGE,
    [ProposalType.research]: PrismaProposalType.RESEARCH,
  }

  return typeMap[type]
}

const mapProposalTypeFromPrisma = (type: PrismaProposalType): ProposalType => {
  const typeMap = {
    [PrismaProposalType.BUY_OR_SELL]: ProposalType.buyOrSell,
    [PrismaProposalType.DONATE]: ProposalType.donate,
    [PrismaProposalType.EXCHANGE]: ProposalType.exchange,
    [PrismaProposalType.RESEARCH]: ProposalType.research,
  }

  return typeMap[type]
}

export const mapProposalType = {
  toPrisma: mapProposalTypeToPrisma,
  fromPrisma: mapProposalTypeFromPrisma,
}
