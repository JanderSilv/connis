import { Image as PrismaImage } from '@prisma/client'

import { Image } from 'src/models/types'

const mapImageFromPrisma = (image: PrismaImage): Image => {
  const { alt } = image

  return {
    ...image,
    alt: alt || undefined,
  }
}

export const mapImage = {
  fromPrisma: mapImageFromPrisma,
}
