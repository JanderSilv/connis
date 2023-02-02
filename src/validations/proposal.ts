import { ProposalType } from 'src/models/enums'
import * as zod from 'zod'

export const makeAnOfferValidationSchema = zod.object({
  message: zod.string().min(1, 'A mensagem é obrigatória'),
  proposalType: zod.nativeEnum(ProposalType, {
    required_error: 'O tipo da proposta é obrigatório',
  }),
})

export type makeAnOfferSchema = zod.infer<typeof makeAnOfferValidationSchema>
