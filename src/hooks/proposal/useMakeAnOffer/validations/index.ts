import { unformatCurrency } from 'src/helpers/formatters'
import { OfferCategory, ProposalType, TRL } from 'src/models/enums'
import * as zod from 'zod'

export const defaultOfferValidationSchema = zod.object({
  category: zod.literal(OfferCategory.default),
  message: zod.string().min(1, 'A mensagem é obrigatória'),
  proposalType: zod.nativeEnum(ProposalType, {
    required_error: 'O tipo da proposta é obrigatório',
  }),
})

export const counterProposalOfferValidationSchema = defaultOfferValidationSchema.extend({
  category: zod.literal(OfferCategory.counterProposal),
  trl: zod.nativeEnum(TRL, {
    required_error: 'O TRL é obrigatório',
  }),
  goalTRL: zod.nativeEnum(TRL, {
    required_error: 'O TRL alvo é obrigatório',
  }),
  budget: zod
    .string()
    .optional()
    .refine(
      value => {
        if (!value) return true
        return unformatCurrency(value) > 0
      },
      {
        message: 'O valor deve ser maior que zero',
      }
    ),
})

export type counterProposalOfferSchema = zod.infer<typeof counterProposalOfferValidationSchema>

export const makeOfferValidationSchema = (proposalType: ProposalType[]) =>
  zod
    .discriminatedUnion('category', [defaultOfferValidationSchema, counterProposalOfferValidationSchema])
    .refine(
      data => {
        if (data.category === OfferCategory.counterProposal && data.goalTRL < data.trl) return false
        return true
      },
      {
        message: 'O TRL alvo deve ser maior ao TRL atual',
        path: ['goalTRL'],
      }
    )
    .refine(
      data => {
        if (
          data.category === OfferCategory.counterProposal &&
          proposalType.some(type => [ProposalType.buyOrSell, ProposalType.research].includes(type)) &&
          !data.budget
        )
          return false
        return true
      },
      {
        message: 'O valor é obrigatório',
        path: ['budget'],
      }
    )

export type OfferSchema = zod.infer<ReturnType<typeof makeOfferValidationSchema>>
