export const formatCurrency = (value?: number) =>
  !!value
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    : ''
