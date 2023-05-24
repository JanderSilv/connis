import { PrismaClient } from '@prisma/client'

import cnaesJson from '../../src/data/ibge/cnaes.json'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.cnae.createMany({
    data: cnaesJson.map(cnae => ({
      code: cnae.id,
      label: cnae.label,
    })),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
