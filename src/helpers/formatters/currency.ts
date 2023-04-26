export const formatCurrency = (value?: number, options?: Intl.NumberFormatOptions) => {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options,
  }).format(value)
}

export const unformatCurrency = (value?: string) => {
  if (!value) return 0
  return Number(value.replace(/[^0-9,]/g, '').replace(',', '.'))
}
