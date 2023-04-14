import { UserPermission } from 'src/models/types'

const userPermissions: UserPermission[] = [
  {
    key: 'proposal',
    name: 'Proposta',
    value: 'CRUD',
    labels: {
      C: 'Cadastrar',
      R: 'Visualizar',
      U: 'Editar',
      D: 'Excluir',
    },
  },
  {
    key: 'offer',
    name: 'Oferta',
    value: 'CRUD',
    labels: {
      C: 'Fazer',
      R: 'Visualizar',
      U: 'Editar',
      D: 'Excluir',
    },
  },
  {
    key: 'negotiation',
    name: 'Negociação',
    value: 'CRD',
    labels: {
      C: 'Negociar',
      R: 'Visualizar',
      D: 'Cancelar',
    },
  },
]

export const permissionFakeData = {
  userPermissions,
}
