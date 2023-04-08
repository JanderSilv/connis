import { api } from './api'
import { mapCompanyFromBrasilApi } from './formatters'
import { BrasilApiCompany } from './types'

const getCompany = async (cnpj: string) => {
  const { data } = await api.get<BrasilApiCompany>(`/cnpj/v1/${cnpj}`)
  return mapCompanyFromBrasilApi(data)
}

export const brasilAPIService = {
  getCompany,
}
