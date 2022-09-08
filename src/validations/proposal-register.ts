import { ProposalCategory } from 'src/models/enums'
import { Proposal } from 'src/models/types'
import * as yup from 'yup'

const messages = {
  proposalCategory: 'A categoria da proposta é obrigatória',
  keywords: 'Pelo menos uma palavra-chave é obrigatória',
  proposalType: 'O tipo da proposta é obrigatório',
}

export const proposalRegisterSchema: yup.SchemaOf<Proposal> = yup.object().shape(
  {
    title: yup.string().required('O título da proposta é obrigatório'),
    proposalCategory: yup.number().required(messages.proposalCategory).typeError(messages.proposalCategory),
    proposalCategoryOther: yup.string().when('proposalCategory', {
      is: ProposalCategory.others,
      then: yup.string().required('A categoria da proposta é obrigatória'),
      otherwise: yup.string().notRequired(),
    }),
    projectDescription: yup.string().when('projectDescription', value => {
      if (value) return yup.string().min(10, 'A descrição do projeto deve ter no mínimo 10 caracteres')
      return yup.string().notRequired()
    }),
    proposalDescription: yup.string().required('A descrição da proposta é obrigatória'),
    keywords: yup
      .array()
      .of(yup.string().required(messages.keywords))
      .required(messages.keywords)
      .typeError(messages.keywords)
      .min(1, messages.keywords),
    trl: yup.number().required('O TRL é obrigatório'),
    proposalType: yup
      .array()
      .of(yup.number().required(messages.proposalType))
      .required(messages.proposalType)
      .min(1, 'Selecione pelo menos uma opção'),
    proposalCategoryQuestions: yup.object().shape({
      waste: yup
        .object()
        .shape({
          testHasBeenPerformed: yup.boolean().notRequired(),
          toxicity: yup.boolean().notRequired(),
          productionVolume: yup.string().notRequired(),
        })
        .notRequired(),
    }),
  },
  [['projectDescription', 'projectDescription']]
)
