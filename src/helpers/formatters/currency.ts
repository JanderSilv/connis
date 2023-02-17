export const formatCurrency = (value?: number, options?: Intl.NumberFormatOptions) => {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options,
  }).format(value)
}

export const unformatCurrency = (value?: string) => (!!value ? Number(value.replace(/[^0-9]/g, '')) : 0)
