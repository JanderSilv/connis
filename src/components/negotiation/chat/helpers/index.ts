export const checkHasOnlyOneEmoji = (str: string) => {
  const regex = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/
  return regex.test(str)
}
