import { Company } from 'src/models/types'
import { CompanyAnalystsParams, CompanyInput, CompanyUpdateInput } from './models'

import { api } from '../api'

const baseUrl = '/company'

const createCompany = (company: CompanyInput) => api.post<Company>(baseUrl, company)

const deleteCompany = (companyId: string) => api.delete<Company>(`${baseUrl}/${companyId}`)

const getCompany = (companyId: string) => api.get<Company>(`${baseUrl}/${companyId}`)

const getCompanyFetcher = (url: string) => api.get<Company>(url).then(({ data }) => data)

const getCompanyBySlug = (companySlug: string) =>
  api.get<Company[]>(baseUrl, {
    params: {
      slug: companySlug,
    },
  })

const getBySlugFetcher = (args: [string, string]) => getCompanyBySlug(args[1]).then(({ data }) => data[0])

const getCompanyAnalysts = (companyId: string, params?: CompanyAnalystsParams) =>
  api.get<Company>(`${baseUrl}/${companyId}/analysts`, {
    params,
  })

const updateCompany = (companyId: string, company: CompanyUpdateInput) =>
  api.put<Company>(`${baseUrl}/${companyId}`, company)

export const companyService = {
  baseUrl,
  create: createCompany,
  delete: deleteCompany,
  get: getCompany,
  getFetcher: getCompanyFetcher,
  getBySlug: getCompanyBySlug,
  getBySlugFetcher,
  getAnalysts: getCompanyAnalysts,
  update: updateCompany,
}
