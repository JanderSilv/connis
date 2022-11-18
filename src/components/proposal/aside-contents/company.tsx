import { Avatar, Box, Button, Stack, styled, Typography } from '@mui/material'
import { makeCompanyData } from 'src/helpers/proposal'
import { Company } from 'src/models/types'
import { KeyData } from 'src/styles/proposal'

type Props = Company

export const AsideContentCompany = (company: Props) => {
  const { logo, name } = company
  return (
    <>
      <CompanyHeader>
        <Avatar src={logo}>{name[0].toUpperCase()}</Avatar>
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
