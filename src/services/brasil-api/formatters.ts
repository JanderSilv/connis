import { CompanyUser } from 'src/models/types'
import { BrasilApiCompany } from './types'

export const formatCompany = (company: BrasilApiCompany): CompanyUser => {
  const { uf, cnpj } = company

  return {
    id: 0,
    name: company.nome_fantasia || company.razao_social,
    type: 'company',
    cnpj,
    address: {
      id: 0,
      uf,
      city: company.municipio,
      cep: company.cep,
    },
    cnae: {
      id: company.cnae_fiscal.toString(),
      label: company.cnae_fiscal_descricao,
    },
    email: '',
    phone: company.ddd_telefone_1 || company.ddd_telefone_2,
    size: company.codigo_porte,
    socialCapital: company.capital_social,
    analysts: [],
  }
}
