import { TRL } from 'src/models/enums'
import { CardData } from 'src/components/cards-select'
import {
  AddShoppingCartIcon,
  CenterFocusStrongIcon,
  FormatListBulletedIcon,
  GrainIcon,
  InsightsIcon,
  LocalShippingIcon,
  ScienceIcon,
  SearchIcon,
  TipsAndUpdatesIcon,
  WorkspacesIcon,
} from 'src/assets/icons'

export const trlOptions: CardData[] = [
  {
    id: TRL.trl0,
    label: 'TRL 0',
    icon: TipsAndUpdatesIcon,
    title: 'Ideia',
    description: 'Conceitos ainda não foram testados',
  },
  {
    id: TRL.trl1,
    label: 'TRL 1',
    icon: SearchIcon,
    title: 'Pesquisa Básica',
    description: 'Identificação do lastro de conhecimento',
  },
  {
    id: TRL.trl2,
    label: 'TRL 2',
    icon: FormatListBulletedIcon,
    title: 'Formulação da Tecnologia',
    description: 'Concepção de possíveis aplicações',
  },
  {
    id: TRL.trl3,
    label: 'TRL 3',
    icon: ScienceIcon,
    title: 'Pesquisa Aplicada',
    description: 'Testes laboratoriais e prova de conceito',
  },
  {
    id: TRL.trl4,
    label: 'TRL 4',
    icon: WorkspacesIcon,
    title: 'Teste em Escala Reduzida',
    description: 'Validação da tecnologia em ambiente controlado',
  },
  {
    id: TRL.trl5,
    label: 'TRL 5',
    icon: GrainIcon,
    title: 'Teste em Escala Piloto',
    description: 'Modelo validado em ambiente simulado',
  },
  {
    id: TRL.trl6,
    label: 'TRL 6',
    icon: InsightsIcon,
    title: 'Protótipo em teste',
    description: 'Situação próxima à do desempenho esperado',
  },
  {
    id: TRL.trl7,
    label: 'TRL 7',
    icon: CenterFocusStrongIcon,
    title: 'Demonstração',
    description: 'Protótipo analisado em ambiente operacional',
  },
  {
    id: TRL.trl8,
    label: 'TRL 8',
    icon: AddShoppingCartIcon,
    title: 'Fase Pré-Comercial',
    description: 'Tecnologia pronta e validada em ambiente real',
  },
  {
    id: TRL.trl9,
    label: 'TRL 9',
    icon: LocalShippingIcon,
    title: 'Aplicação da Tecnologia',
    description: 'O produto está pronto para ir para o mercado',
  },
]
