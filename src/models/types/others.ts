import { AxiosError } from 'axios'
import { ZodIssue } from 'zod'

export type Component = {
  component?: React.ElementType
}

export type ResponseError = ZodIssue
export type HttpResponseError = AxiosError<{
  title: string
  message: string
}>
