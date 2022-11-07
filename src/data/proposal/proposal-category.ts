import { CardData } from 'src/components/proposal-register/cards-select'
import { ProposalCategory } from 'src/models/enums'
import { PlusOneIcon, QuestionMarkIcon, RecyclingIcon, RocketIcon } from 'src/assets/icons'

export const proposalCategories = {
  [ProposalCategory.waste]: {
    id: ProposalCategory.waste,
    title: 'Resíduos',
    icon: RecyclingIcon,
    description: 'Resíduos sólidos, líquidos e gasosos',
  },
  [ProposalCategory.disruptiveInnovation]: {
    id: ProposalCategory.disruptiveInnovation,
    title: 'Inovação Disruptiva',
    icon: RocketIcon,
    description: 'Almeja estudar novos conceitos e desenvolver algo totalmente inovador do zero',
  },
  [ProposalCategory.incrementalInnovation]: {
    id: ProposalCategory.incrementalInnovation,
    title: 'Inovação Incremental',
    icon: PlusOneIcon,
    description: 'Almeja melhorar um produto existente',
  },
  [ProposalCategory.others]: {
    id: ProposalCategory.others,
    title: 'Outros',
    icon: QuestionMarkIcon,
    description: 'Outros tipos de propostas',
  },
}

export const proposalCategoryOptions: CardData[] = [
  {
    ...proposalCategories[ProposalCategory.waste],
  },
  {
    ...proposalCategories[ProposalCategory.disruptiveInnovation],
  },
  {
    ...proposalCategories[ProposalCategory.incrementalInnovation],
  },
  {
    ...proposalCategories[ProposalCategory.others],
  },
]
