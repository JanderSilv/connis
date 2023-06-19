import { ICT } from 'src/models/types'

import { formatCNPJ } from 'src/helpers/formatters'

import { DataSectionData } from 'src/components/profile'
import { Link } from 'src/components/shared'

import { BusinessIcon, EmailIcon, LanguageIcon, PlaceIcon } from 'src/assets/icons'

export const makeICTDataSectionData = (
  ict: ICT,
  isUserProfileOwner: boolean,
  data?: DataSectionData[]
): DataSectionData[] => [
  ...(isUserProfileOwner ? [{ icon: EmailIcon, value: ict.email, order: 5 }] : []),
  ...(!!ict.website
    ? [
        {
          icon: LanguageIcon,
          value: (
            <Link href={ict.website} openInNewTab>
              {ict.website}
            </Link>
          ),
          order: 10,
        },
      ]
    : []),
  { icon: BusinessIcon, value: formatCNPJ(ict.cnpj), order: 15 },
  { icon: PlaceIcon, value: `${ict.address.city} - ${ict.address.uf}`, order: 20 },
  ...(data || []),
]
