import { negotiationFakeData } from './negotiation'
import { permissionFakeData } from './permission'
import { userFakeData } from './user'

export const fakeData = {
  ...negotiationFakeData,
  ...userFakeData,
  ...permissionFakeData,
}
