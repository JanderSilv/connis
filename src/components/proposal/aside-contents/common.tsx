import { Typography } from '@mui/material'

import { UserType } from 'src/models/enums'
import { CompanyUser, ICTUser } from 'src/models/types'

import { makeCompanyData, makeICTData } from 'src/helpers/proposal'

import { UserAvatar } from 'src/components/shared'

import { KeyData } from 'src/styles/proposal'
import { CompanyHeader } from './styles'

type Props = CompanyUser | ICTUser

export const CompanyData = (company: Props) => {
  const { name, image, type } = company
  return (
    <>
      <CompanyHeader>
        <UserAvatar name={name} src={image} />
        <Typography component="h2" variant="h3">
          {name}
        </Typography>
      </CompanyHeader>

      {type === UserType.company
        ? makeCompanyData(company).map(({ label, value, displayBlock }) => (
            <KeyData key={label}>
              <Typography component="strong" display={displayBlock ? 'block' : undefined}>
                {label}:
              </Typography>{' '}
              {value}
            </KeyData>
          ))
        : makeICTData(company).map(({ label, value }) => (
            <KeyData key={label}>
              <Typography component="strong">{label}:</Typography> {value}
            </KeyData>
          ))}
    </>
  )
}
