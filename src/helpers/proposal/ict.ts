import { formatCNPJ, formatString } from 'src/helpers/formatters'
import { ICT } from 'src/models/types'

export const makeICTData = (ict: ICT) => [
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
    value: `${formatString.capitalizeFirstLetter(ict.address.city)} - ${ict.address.uf}`,
  },
]
