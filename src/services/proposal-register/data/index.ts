import { SuggestionsKeys } from '../models'

export const suggestions: Record<SuggestionsKeys, string> = {
  proposal:
    'Com base na descrição do projeto e da proposta abaixo, sugira em tópicos, separados por quebra de linha, como melhor descrever o projeto e a proposta, com o objetivo de entender o necessário do escopo:',
  keywords:
    'Com base na descrição do projeto e da proposta, retorne algumas palavras chaves. Retorne somente as palavras-chaves (sem títulos), separadas por vírgula e sem ponto final',
  trl: 'Com base na descrição do projeto e da proposta, retorne a possível métrica TRL',
} as const
