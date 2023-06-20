import { Address, ICT } from 'src/models/types'

type ExcludedICTFields = 'id' | 'analystsIds' | 'createdAt' | 'updatedAt' | 'address' | 'cnae'

export type ICTInput = Partial<
  Omit<ICT, ExcludedICTFields> & {
    cnaeId: string
    address: Omit<Address, 'id'>
  }
>
