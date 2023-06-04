const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const capitalizeFirstLetters = (str: string) =>
  str
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

export const formatString = {
  capitalizeFirstLetter,
  capitalizeFirstLetters,
}
