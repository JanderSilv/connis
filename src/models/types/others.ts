import { ZodIssue } from 'zod'

export type Component = {
  component?: React.ElementType
}

export type ResponseError = ZodIssue
