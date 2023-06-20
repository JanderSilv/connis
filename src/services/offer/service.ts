import { Offer } from 'src/models/types'
import { api } from '../api'
import { MakeOfferResponse, OfferInput, OfferParams, OfferUpdateInput } from './models'

const companyBaseUrl = '/company-offer'
const ictBaseUrl = '/ict-offer'

const getCompanyOffers = (params?: OfferParams) =>
  api.get<{ offers: Offer[] }>(companyBaseUrl, {
    params,
  })

const getCompanyOffersFetcher = (args: [string, OfferParams]) => getCompanyOffers(args[1]).then(res => res.data.offers)

const getIctOffers = (params?: OfferParams) =>
  api.get(ictBaseUrl, {
    params,
  })

const getIctOffersFetcher = (args: [string, OfferParams]) => getIctOffers(args[1]).then(res => res.data)

const makeCompanyOffer = (data: OfferInput) => api.post<MakeOfferResponse>(companyBaseUrl, data)

const makeIctOffer = (data: OfferInput) => api.post<MakeOfferResponse>(ictBaseUrl, data)

const updateCompanyOffer = (offerId: string, data: OfferUpdateInput) => api.put(`${companyBaseUrl}/${offerId}`, data)

const updateIctOffer = (offerId: string, data: OfferUpdateInput) => api.put(`${ictBaseUrl}/${offerId}`, data)

export const offerService = {
  companyBaseUrl,
  ictBaseUrl,
  getCompanyOffers,
  getCompanyOffersFetcher,
  getIctOffers,
  getIctOffersFetcher,
  makeCompanyOffer,
  updateCompanyOffer,
  makeIctOffer,
  updateIctOffer,
}
