import { Typography } from '@mui/material'

import { Company, ICT } from 'src/models/types'

import { makeCompanyData, makeICTData } from 'src/helpers/proposal'

import { Link, UserAvatar } from 'src/components/shared'

import { KeyData } from 'src/styles/proposal'
import { CompanyHeader } from './styles'
import { formatString } from 'src/helpers/formatters'
import { pages } from 'src/constants'

type ICTDataProps = {
  type: 'ict'
} & ICT

type CompanyDataProps = {
  type: 'company'
} & Company

type Props = ICTDataProps | CompanyDataProps

export const CompanyData = (organization: Props) => {
  const { name, image, slug, type } = organization
  return (
    <>
      <Link href={`${type === 'company' ? pages.companyProfile : pages.ictProfile}/${slug}`} noEffect>
        <CompanyHeader>
          <UserAvatar name={name} src={image} />
          <Typography component="h2" variant="h3">
            {formatString.capitalizeFirstLetters(name)}
          </Typography>
        </CompanyHeader>
      </Link>

      {type === 'company'
        ? makeCompanyData(organization).map(({ label, value, displayBlock }) => (
            <KeyData key={label}>
              <Typography component="strong" display={displayBlock ? 'block' : undefined}>
                {label}:
              </Typography>{' '}
              {value}
            </KeyData>
          ))
        : makeICTData(organization).map(({ label, value }) => (
            <KeyData key={label}>
              <Typography component="strong">{label}:</Typography> {value}
            </KeyData>
          ))}
    </>
  )
}
