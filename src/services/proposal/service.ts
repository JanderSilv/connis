import { Negotiation, Proposal } from 'src/models/types'
import { ProposalInput, ProposalUpdateInput, ProposalsParams } from './models'

import { api } from '../api'

const baseUrl = '/proposal'

const acceptProposalNegotiation = (proposalId: string, negotiationId: string) =>
  api.post(`${baseUrl}/${proposalId}/accepted-negotiation/${negotiationId}`)

const createProposal = (data: ProposalInput) => api.post<Proposal>(baseUrl, data)

const getAcceptedProposalNegotiation = (proposalId: string) =>
  api.get<Negotiation>(`${baseUrl}/${proposalId}/accepted-negotiation`)

const getProposals = (params?: ProposalsParams) => api.get<Proposal[]>(baseUrl, { params })

const getProposalsFetcher = (args: [string, ProposalsParams?]) => getProposals(args[1]).then(res => res.data)

const getProposal = (proposalId: string) => api.get<Proposal>(`${baseUrl}/${proposalId}`)

const getProposalFetcher = (url: string) => api.get<Proposal>(url).then(res => res.data)

const getProposalOffers = (proposalId: string, companyId?: string) =>
  api.get(`${baseUrl}/${proposalId}/offers`, {
    params: { companyId },
  })

const getProposalOffersFetcher = (args: [string, string?]) =>
  api.get(args[0], {
    params: { companyId: args[1] },
  })

const getSimilarProposals = (proposalId: string) => api.get<Proposal[]>(`${baseUrl}/${proposalId}/similars`)

const getSimilarProposalsFetcher = (args: [string, string]) => getSimilarProposals(args[1]).then(res => res.data)

const rejectProposalNegotiation = (proposalId: string) => api.delete(`${baseUrl}/${proposalId}/accepted-negotiation`)

const updateProposal = (proposalId: string, data: ProposalUpdateInput) =>
  api.put<Proposal>(`${baseUrl}/${proposalId}`, data)

const viewProposal = (proposalId: string, userId: string) => api.post(`${baseUrl}/${proposalId}/view/${userId}`)

export const proposalService = {
  baseUrl,
  acceptNegotiation: acceptProposalNegotiation,
  create: createProposal,
  getAcceptedNegotiation: getAcceptedProposalNegotiation,
  list: getProposals,
  listFetcher: getProposalsFetcher,
  get: getProposal,
  getFetcher: getProposalFetcher,
  getOffers: getProposalOffers,
  getOffersFetcher: getProposalOffersFetcher,
  getSimilarProposals,
  getSimilarProposalsFetcher,
  rejectNegotiation: rejectProposalNegotiation,
  update: updateProposal,
  view: viewProposal,
}
