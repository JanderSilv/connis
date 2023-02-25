import * as zod from 'zod'

export const offersFiltersSchema = zod.object({
  search: zod.string().optional(),
  status: zod.array(zod.number()).optional().default([]),
})

export type OffersFilters = zod.infer<typeof offersFiltersSchema>
