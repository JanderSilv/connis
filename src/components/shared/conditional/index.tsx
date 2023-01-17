type ConditionalProps = {
  condition?: boolean
  children: React.ReactNode
}

export const Conditional = ({ condition, children }: ConditionalProps) => (condition ? <>{children}</> : null)
