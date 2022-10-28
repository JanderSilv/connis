import axios from 'axios'
import fs from 'fs'

export type CNAE = {
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

const createCNAEsJSONFile = async () => {
  const getCNAEs = async () => {
    const { data: cnaes } = await axios.get<CNAE[]>('https://servicodados.ibge.gov.br/api/v2/cnae/classes')
    return cnaes
  }

  const formatCNAEId = (cnaeId: string, divisionId: string) => {
    const formattedId = `${cnaeId.slice(0, 4)}-${cnaeId.slice(4)}`
    const formattedDivisionId = divisionId.toLowerCase()

    return `${formattedId}/${formattedDivisionId}`
  }

  const capitalizeFirstLetters = (word: string) =>
    word
      .split(' ')
      .map(w => {
        const lowerWord = w.toLowerCase()
        if (['e', 'da', 'de', 'do', 'das', 'dos', 'à'].includes(lowerWord)) return lowerWord
        return lowerWord[0].toUpperCase() + lowerWord.slice(1).toLowerCase()
      })
      .join(' ')

  const filterProperties = (cnaes: CNAE[]) => {
    return cnaes.map(cnae => {
      const { id, descricao, grupo } = cnae
      return { id, label: `${formatCNAEId(id, grupo.divisao.id)} ${capitalizeFirstLetters(descricao)}` }
    })
  }

  const filteredCNAEs = filterProperties(await getCNAEs())

  fs.writeFile(`${__dirname}/../src/data/ibge/cnaes.json`, JSON.stringify(filteredCNAEs, null, 2), 'utf8', error =>
    console.error(error)
  )
}

createCNAEsJSONFile()
