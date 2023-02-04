export const formatCurrency = (value?: number) =>
  !!value
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    : ''

export const unformatCurrency = (value?: string) => (!!value ? Number(value.replace(/[^0-9]/g, '')) : 0)
