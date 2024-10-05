import { TRL as PrismaTRL } from '@prisma/client'

import { TRL } from 'src/models/enums'

const mapTRLToPrisma = (trl: TRL): PrismaTRL => {
  const trlMap = {
    [TRL.trl0]: PrismaTRL.TRL0,
    [TRL.trl1]: PrismaTRL.TRL1,
    [TRL.trl2]: PrismaTRL.TRL2,
    [TRL.trl3]: PrismaTRL.TRL3,
    [TRL.trl4]: PrismaTRL.TRL4,
    [TRL.trl5]: PrismaTRL.TRL5,
    [TRL.trl6]: PrismaTRL.TRL6,
    [TRL.trl7]: PrismaTRL.TRL7,
    [TRL.trl8]: PrismaTRL.TRL8,
    [TRL.trl9]: PrismaTRL.TRL9,
  }

  return trlMap[trl]
}

const mapTRLFromPrisma = (category: PrismaTRL): TRL => {
  const trlMap = {
    [PrismaTRL.TRL0]: TRL.trl0,
    [PrismaTRL.TRL1]: TRL.trl1,
    [PrismaTRL.TRL2]: TRL.trl2,
    [PrismaTRL.TRL3]: TRL.trl3,
    [PrismaTRL.TRL4]: TRL.trl4,
    [PrismaTRL.TRL5]: TRL.trl5,
    [PrismaTRL.TRL6]: TRL.trl6,
    [PrismaTRL.TRL7]: TRL.trl7,
    [PrismaTRL.TRL8]: TRL.trl8,
    [PrismaTRL.TRL9]: TRL.trl9,
  }

  return trlMap[category]
}

export const mapTRL = {
  toPrisma: mapTRLToPrisma,
  fromPrisma: mapTRLFromPrisma,
}
