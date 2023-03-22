import { SuggestionsKeys } from '../models'

export const suggestions: Record<SuggestionsKeys, string> = {
  proposal:
    'Com base na descrição do problema abaixo, sugira em tópicos, sem marcador antes do tópico, como melhor descrever o problema, com o objetivo de entender todo o escopo:',
  keywords:
    'Com base na descrição do projeto e do problema, retorne algumas palavras chaves. Retorne somente as palavras, separadas por vírgula e sem ponto final.',
  trl: 'Com base na descrição do projeto e do problema, retorne a possível métrica TRL',
} as const
