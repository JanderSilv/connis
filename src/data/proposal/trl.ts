import { TRL } from 'src/models/enums'
import { CardData } from 'src/components/shared'
import {
  AddShoppingCartIcon,
  BiotechIcon,
  CenterFocusStrongIcon,
  FormatListBulletedIcon,
  GrainIcon,
  InsightsIcon,
  LocalShippingIcon,
  ScienceIcon,
  SearchIcon,
} from 'src/assets/icons'

export const trls = {
  [TRL.trl1]: {
    id: TRL.trl1,
    label: 'TRL 1',
    icon: SearchIcon,
    title: 'Princípios básicos',
    description: 'A tecnologia está em estágio inicial de pesquisa',
  },
  [TRL.trl2]: {
    id: TRL.trl2,
    label: 'TRL 2',
    icon: FormatListBulletedIcon,
    title: 'Conceito Formulado',
    description: 'A tecnologia está em fase de concepção',
  },
  [TRL.trl3]: {
    id: TRL.trl3,
    label: 'TRL 3',
    icon: ScienceIcon,
    title: 'Conceito Validado',
    description: 'A tecnologia da indícios de funcionamento',
  },
  [TRL.trl4]: {
    id: TRL.trl4,
    label: 'TRL 4',
    icon: BiotechIcon,
    title: 'Validado em Laboratório',
    description: 'A tecnologia foi validada em laboratório',
  },
  [TRL.trl5]: {
    id: TRL.trl5,
    label: 'TRL 5',
    icon: GrainIcon,
    title: 'Validado em Amb. Simulado',
    description: 'A tecnologia foi validada em ambiente relevante',
  },
  [TRL.trl6]: {
    id: TRL.trl6,
    label: 'TRL 6',
    icon: InsightsIcon,
    title: 'Validado em Ambiente Real',
    description: 'A tecnologia foi validada em ambiente real',
  },
  [TRL.trl7]: {
    id: TRL.trl7,
    label: 'TRL 7',
    icon: CenterFocusStrongIcon,
    title: 'Demonstração',
    description: 'A tecnologia é viável para fins de demonstração',
  },
  [TRL.trl8]: {
    id: TRL.trl8,
    label: 'TRL 8',
    icon: AddShoppingCartIcon,
    title: 'Fase Pré-Comercial',
    description: 'A tecnologia é qualificada para fins de uso operacional',
  },
  [TRL.trl9]: {
    id: TRL.trl9,
    label: 'TRL 9',
    icon: LocalShippingIcon,
    title: 'Aplicação da Tecnologia',
    description: 'O produto está pronto para ir para o mercado',
  },
}

export const trlOptions: CardData[] = [
  trls[TRL.trl1],
  trls[TRL.trl2],
  trls[TRL.trl3],
  trls[TRL.trl4],
  trls[TRL.trl5],
  trls[TRL.trl6],
  trls[TRL.trl7],
  trls[TRL.trl8],
  trls[TRL.trl9],
]
