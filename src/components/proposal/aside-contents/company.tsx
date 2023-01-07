import { Box, Button, Stack, styled, Typography } from '@mui/material'

import { makeCompanyData } from 'src/helpers/proposal'
import { CompanyUser } from 'src/models/types'
import { KeyData } from 'src/styles/proposal'
import { UserAvatar } from 'src/components/shared'

type Props = CompanyUser

export const AsideContentOfferCompany = (company: Props) => {
  const { image, name } = company
  return (
    <>
      <CompanyHeader>
        <UserAvatar name={name} src={image} />
        <Typography component="h2" variant="h3">
          {name}
        </Typography>
      </CompanyHeader>

      {makeCompanyData(company).map(({ label, value, displayBlock }) => (
        <KeyData key={label}>
          <Typography component="strong" display={displayBlock ? 'block' : undefined}>
            {label}:
          </Typography>{' '}
          {value}
        </KeyData>
      ))}

      <Stack mt={3} gap={1}>
        <Button variant="contained" color="primary" fullWidth>
          Estou Interessado
        </Button>

        <Button variant="contained" color="warning" fullWidth>
          Fazer contra proposta
        </Button>
      </Stack>
    </>
  )
}

export const CompanyHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}))
CompanyHeader.defaultProps = {
  component: 'header',
}
