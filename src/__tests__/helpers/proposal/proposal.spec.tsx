import { makeCompanyData, makeProposalTypeText, makeWasteQuestionsData } from 'src/helpers/proposal'
import { fakeData } from 'src/data/fake'
import { proposalAdditionalQuestions } from 'src/data/proposal'

const { company, proposal } = fakeData
describe('Proposal helpers', () => {
  it('should make company data', () => {
    const companyData = makeCompanyData(company)
    const expectedCompanyData = [
      {
        label: 'CNAE',
        value: '6201-5/62:: Desenvolvimento de Programas de Computador Sob Encomenda',
        displayBlock: true,
      },
      {
        label: 'Porte',
        value: 'Micro',
      },
      {
        label: 'Local',
        value: 'Salvador - BA',
      },
      {
        label: 'Capital Social',
        value: 'R$ 1.000.000,00',
      },
    ]
    expect(new Set(companyData)).toEqual(new Set(expectedCompanyData))
    expect(companyData.length).toBe(expectedCompanyData.length)
  })
  it('should make proposal type text', () => {
    const ProposalType = makeProposalTypeText(proposal.proposalType)
    expect(ProposalType?.props.children[0]).toBe('A empresa está aberta a negociações envolvendo')
  })
  it('should make waste questions data', () => {
    const { production, testHasBeenPerformed, toxicity } = proposalAdditionalQuestions.waste
    const wasteQuestionsData = makeWasteQuestionsData(proposal.categoryQuestions.waste!)
    const expectedWasteQuestionsData = [
      {
        question: testHasBeenPerformed,
        answer: 'Não',
      },
      {
        question: toxicity,
        answer: 'Não',
      },
      {
        question: production,
        answer: '10 Quilos (kg) Diariamente',
      },
    ]
    expect(new Set(wasteQuestionsData)).toEqual(new Set(expectedWasteQuestionsData))
    expect(wasteQuestionsData.length).toBe(expectedWasteQuestionsData.length)
  })
})
