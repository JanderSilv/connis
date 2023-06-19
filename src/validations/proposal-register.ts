import * as yup from 'yup'

import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'

import { unformatCurrency } from 'src/helpers/formatters'

type ExcludedProposalKeys =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'offers'
  | 'views'
  | 'budget'
  | 'status'
  | 'viewed'
  | 'company'
  | 'unseenActivities'
  | 'userProponentId'

export type ProposalSchema = Omit<Proposal, ExcludedProposalKeys> & {
  budget?: string
}

const messages = {
  proposalCategory: 'A categoria da proposta é obrigatória',
  keywords: 'Pelo menos uma palavra-chave é obrigatória',
  proposalType: 'O tipo da proposta é obrigatório',
}

export const proposalRegisterSchema: yup.SchemaOf<ProposalSchema> = yup.object().shape(
  {
    title: yup.string().required('O título da proposta é obrigatório'),
    category: yup
      .number()
      .min(0, messages.proposalCategory)
      .required(messages.proposalCategory)
      .typeError(messages.proposalCategory),
    categoryOther: yup.string().when('proposalCategory', {
      is: ProposalCategory.others,
      then: yup.string().required('A categoria da proposta é obrigatória'),
      otherwise: yup.string().notRequired(),
    }),
    projectDescription: yup.string().when('projectDescription', value => {
      if (value) return yup.string().min(10, 'A descrição do projeto deve ter no mínimo 10 caracteres')
      return yup.string().notRequired()
    }),
    description: yup.string().required('A descrição da proposta é obrigatória'),
    keywords: yup
      .array()
      .of(yup.string().required(messages.keywords))
      .required(messages.keywords)
      .typeError(messages.keywords)
      .min(1, messages.keywords),
    trl: yup
      .number()
      .notRequired()
      .max(yup.ref('goalTrl'), 'O TRL atual deve ser menor ou igual ao TRL que almeja alcançar'),
    goalTrl: yup
      .number()
      .notRequired()
      .min(yup.ref('trl'), 'O TRL que almeja alcançar deve ser maior ou igual ao TRL atual'),
    types: yup
      .array()
      .of(yup.number().required(messages.proposalType))
      .required(messages.proposalType)
      .min(1, 'Selecione pelo menos uma opção'),
    budget: yup
      .string()
      .notRequired()
      .test('is-bigger-than-zero', 'O valor deve ser maior que zero', value =>
        !value ? true : Number(unformatCurrency(value)) > 0
      ),
    suggestedSectors: yup.array().of(yup.string()).notRequired(),
    wasteQuestions: yup.object({
      testHasBeenPerformed: yup.boolean().notRequired(),
      toxicity: yup.boolean().notRequired(),
      production: yup.object({
        volume: yup.string().notRequired(),
        unit: yup
          .string()
          .test('unit', 'A unidade é obrigatória', (value, context) => !context.parent.volume || !!value),
        periodicity: yup
          .string()
          .test('periodicity', 'A periodicidade é obrigatória', (value, context) => !context.parent.volume || !!value),
      }),
    }),
  },
  [['projectDescription', 'projectDescription']]
)
