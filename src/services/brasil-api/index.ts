import { api } from './api'
import { formatCompany } from './formatters'
import { BrasilApiCompany } from './types'

const getCompany = async (cnpj: string) => {
  const { data } = await api.get<BrasilApiCompany>(`/cnpj/v1/${cnpj}`)
  return formatCompany(data)
}

export const brasilAPIService = {
  getCompany,
}
