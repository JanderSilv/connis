import { CardData } from 'src/components/proposal-register/cards-select'
import { ProposalCategory } from 'src/models/enums'
import { PlusOneIcon, QuestionMarkIcon, RecyclingIcon, RocketIcon } from 'src/assets/icons'

export const proposalCategories = {
  [ProposalCategory.waste]: {
    title: 'Resíduos',
    icon: RecyclingIcon,
    description: 'Resíduos sólidos, líquidos e gasosos',
  },
  [ProposalCategory.disruptiveInnovation]: {
    title: 'Inovação Disruptiva',
    icon: RocketIcon,
    description: 'Almeja estudar novos conceitos e desenvolver algo totalmente inovador do zero',
  },
  [ProposalCategory.incrementalInnovation]: {
    title: 'Inovação Incremental',
    icon: PlusOneIcon,
    description: 'Almeja melhorar um produto existente',
  },
  [ProposalCategory.others]: {
    title: 'Outros',
    icon: QuestionMarkIcon,
    description: 'Outros tipos de propostas',
  },
}

export const proposalCategoryOptions: CardData[] = [
  {
    id: ProposalCategory.waste,
    ...proposalCategories[ProposalCategory.waste],
  },
  {
    id: ProposalCategory.disruptiveInnovation,
    ...proposalCategories[ProposalCategory.disruptiveInnovation],
  },
  {
    id: ProposalCategory.incrementalInnovation,
    ...proposalCategories[ProposalCategory.incrementalInnovation],
  },
  {
    id: ProposalCategory.others,
    ...proposalCategories[ProposalCategory.others],
  },
]
