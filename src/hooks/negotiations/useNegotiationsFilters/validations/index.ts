import { z } from 'zod'
import { OrderDirection } from 'src/models/enums'

export const negotiationsFiltersSchema = z.object({
  orderDirection: z.nativeEnum(OrderDirection),
})

export type NegotiationsFilters = z.infer<typeof negotiationsFiltersSchema>
