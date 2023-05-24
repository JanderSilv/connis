import axios from 'axios'
import fs from 'fs'

export type CNAE = {
  id: string
  descricao: string
  observacoes: string[]
  atividades: string[]
  classe: {
    id: string
    descricao: string
    grupo: {
      id: string
      descricao: string
      divisao: {
        id: string
        descricao: string
        secao: {
          id: string
          descricao: string
        }
      }
    }
    observacoes: string[]
  }
}

const createCNAEsJSONFile = async () => {
  const getCNAEs = async () => {
    const { data: cnaes } = await axios.get<CNAE[]>('https://servicodados.ibge.gov.br/api/v2/cnae/subclasses')
    return cnaes
  }

  const formatCNAEId = (cnaeId: string) => cnaeId.replace(/(\d{4})(\d{1})(\d{2})/, '$1-$2/$3')

  const capitalizeFirstLetters = (word: string) =>
    word
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(w => {
        if (w === ' ') return ''
        const lowerWord = w.toLowerCase()
        if (['e', 'da', 'de', 'do', 'das', 'dos', 'à', 'com'].includes(lowerWord)) return lowerWord
        return lowerWord[0].toUpperCase() + lowerWord.slice(1)
      })
      .join(' ')

  const filterProperties = (cnaes: CNAE[]) => {
    const filteredCNAEs = cnaes.map(cnae => ({
      id: cnae.id,
      label: `${formatCNAEId(cnae.id)}: ${capitalizeFirstLetters(cnae.descricao)}`,
    }))
    return [...new Map(filteredCNAEs.map(item => [item['id'], item])).values()]
  }

  const filteredCNAEs = filterProperties(await getCNAEs())

  fs.writeFile(`${__dirname}/../src/data/ibge/cnaes.json`, JSON.stringify(filteredCNAEs, null, 2), 'utf8', error =>
    console.error(error)
  )
}

createCNAEsJSONFile()
