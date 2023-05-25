import { CompanySignUpSchema } from 'src/validations/company-sign-up'
import { BrasilApiCompany } from './types'

export const mapCompanyFromBrasilApi = (company: BrasilApiCompany): CompanySignUpSchema => {
  const { uf, cnpj } = company

  return {
    name: company.nome_fantasia || company.razao_social,
    cnpj,
    address: {
      uf,
      city: company.municipio,
      cep: company.cep,
      street: company.logradouro,
      number: Number(company.numero),
      complement: company.complemento,
      country: 'Brasil',
    },
    cnae: {
      id: company.cnae_fiscal.toString(),
      label: company.cnae_fiscal_descricao,
    },
    email: '',
    phone: company.ddd_telefone_1 || company.ddd_telefone_2,
    size: company.codigo_porte,
    socialCapital: company.capital_social,
  }
}
