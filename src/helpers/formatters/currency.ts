export const formatCurrency = (value?: number, options?: Intl.NumberFormatOptions) => {
  if (value === undefined) return ''
  if (value === 0) return 'R$ 0'
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
