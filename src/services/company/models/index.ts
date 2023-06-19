import { Company, Address, Pagination } from 'src/models/types'

type ExcludedCompanyFields = 'id' | 'analystsIds' | 'createdAt' | 'updatedAt' | 'address' | 'cnae'

export type CompanyInput = {
  cnaeId: string
  address: Omit<Address, 'id'>
} & Omit<Company, ExcludedCompanyFields>

export type CompanyUpdateInput = Partial<CompanyInput>

export type CompanyAnalystsParams = {
  login?: string
} & Pagination
