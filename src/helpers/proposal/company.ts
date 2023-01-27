import { companySizes } from 'src/data/company'
import { Company } from 'src/models/types'

export const makeCompanyData = (company: Company) => [
  {
    label: 'CNAE',
    value: company.cnae?.label,
    displayBlock: true,
  },
  {
    label: 'Porte',
    value: companySizes[company.size],
  },
  {
    label: 'Local',
    value: `${company.address.city} - ${company.address.uf}`,
  },
  {
    label: 'Capital Social',
    value: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(company.socialCapital),
  },
]
