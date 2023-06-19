import { Company } from 'src/models/types'

import { formatCNPJ, formatString } from 'src/helpers/formatters'

import { DataSectionData } from 'src/components/profile'

import { AssignmentIcon, BusinessIcon, EmailIcon, PlaceIcon } from 'src/assets/icons'

export const makeCompanyDataSectionData = (
  company: Company,
  isUserTheOwner: boolean,
  data?: DataSectionData[]
): DataSectionData[] => [
  ...(isUserTheOwner ? [{ icon: EmailIcon, value: company.email, order: 5 }] : []),
  { icon: BusinessIcon, value: formatCNPJ(company.cnpj), order: 10 },
  { icon: AssignmentIcon, value: company.cnae?.label.split(': ')[1], order: 15 },
  {
    icon: PlaceIcon,
    value: `${formatString.capitalizeFirstLetter(company.address.city)} - ${company.address.uf}`,
    order: 20,
  },
  ...(data || []),
]
