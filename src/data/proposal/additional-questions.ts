import { ProposalWasteQuestions } from 'src/models/types'

const waste: Record<keyof ProposalWasteQuestions, string> = {
  testHasBeenPerformed: 'Já foi realizado algum tipo de ensaio nesse resíduo?',
  toxicity: 'Já foi realizado algum estudo de toxicidade ou nocividade nesse resíduo?',
  production: 'Qual o volume de produção?',
} as const

export const proposalAdditionalQuestions = {
  waste,
}
