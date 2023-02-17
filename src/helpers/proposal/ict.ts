import { formatCNPJ } from 'src/helpers/formatters/cnpj'
import { ICTUser } from 'src/models/types'

export const makeICTData = (ict: ICTUser) => [
  {
    label: 'CNAE',
    value: ict.cnpj,
  },
  {
    label: 'CNPJ',
    value: formatCNPJ(ict.cnpj),
  },
  {
    label: 'Local',
    value: `${ict.address.city} - ${ict.address.uf}`,
  },
]
