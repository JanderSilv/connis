export const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('pt-BR', { compactDisplay: 'long', notation: 'compact', ...options }).format(value)
