import * as zod from 'zod'
import { OrderDirection } from 'src/models/enums'

export const proposalsFiltersSchema = zod
  .object({
    contains: zod.string().optional(),
    state: zod.string().optional(),
    category: zod.array(zod.number()).optional().default([]),
    type: zod.array(zod.number()).optional().default([]),
    trl: zod.array(zod.number()).optional().default([]),
    minBudget: zod
      .number()
      .optional()
      .refine(value => !!value && value > 0, {
        message: 'O valor mínimo deve ser maior que zero',
      }),
    maxBudget: zod
      .number()
      .optional()
      .refine(
        value => {
          if (value === undefined) return true
          return value > 0
        },
        {
          message: 'O valor máximo deve ser maior que zero',
        }
      ),
    orderDirection: zod.nativeEnum(OrderDirection),
  })
  .refine(
    ({ minBudget, maxBudget }) => {
      if (maxBudget === undefined || minBudget === undefined) return true
      return maxBudget >= minBudget
    },
    {
      message: 'O valor máximo deve ser maior que o valor mínimo',
      path: ['maxBudget'],
    }
  )

export type ProposalsFilters = zod.infer<typeof proposalsFiltersSchema>
