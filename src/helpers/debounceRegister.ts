import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormTrigger,
} from 'react-hook-form'
import { debounce } from './debounce'

export const debounceRegister = <TFieldValues extends FieldValues = FieldValues>(
  name: FieldPath<TFieldValues>,
  trigger: UseFormTrigger<TFieldValues>,
  register: UseFormRegister<TFieldValues>,
  delay = 500,
  options?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
) => {
  const useFormRegisterReturn: UseFormRegisterReturn = register(name, options)
  const { onChange } = useFormRegisterReturn
  const debouncedValidate = debounce(() => {
    trigger(name)
  }, delay)
  return {
    ...useFormRegisterReturn,
    onChange: (e: any) => {
      onChange(e)
      debouncedValidate()
    },
  }
}
