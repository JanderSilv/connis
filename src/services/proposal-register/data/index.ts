import { SuggestionsKeys } from '../models'

export const suggestions: Record<SuggestionsKeys, string> = {
  proposal:
    'Com base na descrição do projeto e da proposta abaixo, sugira em tópicos, separados por quebra de linha, como melhor descrever o projeto e a proposta, com o objetivo de entender o necessário do escopo:',
  keywords:
    'Com base na descrição do projeto e da proposta, retorne algumas palavras chaves. Retorne somente as palavras-chaves (sem títulos), separadas por vírgula e sem ponto final',
  trl: 'Com base na descrição do projeto e da proposta, retorne a possível métrica TRL',
  sector:
    'Com base na descrição, retorne três possíveis setores da seguinte lista, em formato de array, caso não identifique, retorne um array vazio: "Product Development, Fabrication, Automation, Precision Mechanics, Materials Science, Logistics, Microelectronics Embedded Systems, Data center, Telecommunications and Networks, Semi-anechoic Chamber, Chemistry, Industrial Maintenance, Automotive, Biotechnology, Optical Engineering, HPC Center, Computational Modeling, Oil and Gas, Environment, Naval, Civil Construction, Food Beverage, Software, Health, Robotics, Microelectronics and Chip Design, Foot Wear, Metrology, Energy"',
} as const
