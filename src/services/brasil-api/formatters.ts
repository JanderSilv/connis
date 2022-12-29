import { Company } from 'src/models/types'
import { BrasilApiCompany } from './types'

export const formatCompany = (company: BrasilApiCompany): Company => {
  const { uf, cnpj } = company

  return {
    id: 0,
    name: company.nome_fantasia,
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
  }
}
