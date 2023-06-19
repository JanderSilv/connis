import { OrderDirection } from '../enums/pagination'

export type Pagination<Data = unknown> = {
  page?: number
  pageSize?: number
  orderBy?: Data extends object ? keyof Data : string
  orderDirection?: OrderDirection
}
