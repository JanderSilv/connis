import { ICT } from 'src/models/types'

import { api } from '../api'

const baseUrl = '/ict'

const getICT = (ictId: string) => api.get<ICT>(`${baseUrl}/${ictId}`)

const getICTFetcher = (url: string) => api.get<ICT>(url).then(res => res.data)

const getICTBySlug = (slug: string) =>
  api.get<ICT[]>(baseUrl, {
    params: {
      slug,
    },
  })

const getICTBySlugFetcher = (args: [string, string]) => getICTBySlug(args[1]).then(res => res.data[0])

const updateICT = (ictId: string, data: Partial<ICT>) => api.put<ICT>(`${baseUrl}/${ictId}`, data)

export const ictService = {
  baseUrl,
  get: getICT,
  getFetcher: getICTFetcher,
  getBySlug: getICTBySlug,
  getBySlugFetcher: getICTBySlugFetcher,
  update: updateICT,
}
