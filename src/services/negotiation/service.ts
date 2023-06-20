import { Negotiation } from 'src/models/types'
import { NegotiationInput, NegotiationsParams } from './models'

import { api } from '../api'

const baseUrl = '/negotiations'

const acceptOffer = (negotiationId: string, offerId: string) =>
  api.put(`${baseUrl}/${negotiationId}/accepted-offer/${offerId}`)

const createNegotiation = (data: NegotiationInput) => api.post<{ negotiationId: string }>(baseUrl, data)

const getNegotiation = (negotiationId: string) => api.get<Negotiation>(`${baseUrl}/${negotiationId}`)

const getNegotiationFetcher = (args: [string, string]) => getNegotiation(args[1]).then(res => res.data)

const getNegotiations = (params?: NegotiationsParams) =>
  api.get<Negotiation[]>(baseUrl, {
    params,
  })

const getNegotiationsFetcher = (args: [string, NegotiationsParams?]) => getNegotiations(args[1]).then(res => res.data)

export const negotiationService = {
  baseUrl,
  acceptOffer,
  create: createNegotiation,
  get: getNegotiation,
  getFetcher: getNegotiationFetcher,
  list: getNegotiations,
  listFetcher: getNegotiationsFetcher,
}
