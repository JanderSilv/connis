import { ProposalCategory as PrismaProposalCategory } from '@prisma/client'

import { ProposalCategory } from 'src/models/enums'

const mapProposalCategoryToPrisma = (category: ProposalCategory): PrismaProposalCategory => {
  const categoryMap = {
    [ProposalCategory.disruptiveInnovation]: PrismaProposalCategory.DISRUPTIVE_INNOVATION,
    [ProposalCategory.incrementalInnovation]: PrismaProposalCategory.INCREMENTAL_INNOVATION,
    [ProposalCategory.others]: PrismaProposalCategory.OTHERS,
    [ProposalCategory.waste]: PrismaProposalCategory.WASTE,
  }

  return categoryMap[category]
}

const mapProposalCategoryFromPrisma = (category: PrismaProposalCategory): ProposalCategory => {
  const categoryMap = {
    [PrismaProposalCategory.DISRUPTIVE_INNOVATION]: ProposalCategory.disruptiveInnovation,
    [PrismaProposalCategory.INCREMENTAL_INNOVATION]: ProposalCategory.incrementalInnovation,
    [PrismaProposalCategory.OTHERS]: ProposalCategory.others,
    [PrismaProposalCategory.WASTE]: ProposalCategory.waste,
  }

  return categoryMap[category]
}

export const mapProposalCategory = {
  toPrisma: mapProposalCategoryToPrisma,
  fromPrisma: mapProposalCategoryFromPrisma,
}
