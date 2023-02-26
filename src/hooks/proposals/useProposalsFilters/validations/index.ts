import * as zod from 'zod'

export const proposalsFiltersSchema = zod
  .object({
    search: zod.string().optional(),
    categories: zod.array(zod.number()).optional().default([]),
    types: zod.array(zod.number()).optional().default([]),
    trls: zod.array(zod.number()).optional().default([]),
    minBudget: zod
      .number()
      .optional()
      .refine(value => !!value && value > 0, {
        message: 'O valor mínimo deve ser maior que zero',
      })
      .default(1000),
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
  })
  .refine(
    ({ minBudget, maxBudget }) => {
      if (maxBudget === undefined) return true
      return maxBudget >= minBudget
    },
    {
      message: 'O valor máximo deve ser maior que o valor mínimo',
      path: ['maxBudget'],
    }
  )

export type ProposalsFilters = zod.infer<typeof proposalsFiltersSchema>
