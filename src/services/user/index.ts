import { User } from 'src/models/types'

import { api } from '../api'

type UserSignUpSchema = Omit<User, 'id' | 'createdAt'>

const baseUrl = '/user'

const createUser = (user: UserSignUpSchema) => api.post<User>(baseUrl, user)

const checkUserEmail = (email: string) => api.get<boolean>(`${baseUrl}/check-email/${email}`)

const checkUserUsername = (username: string) => api.get<boolean>(`${baseUrl}/check-username/${username}`)

const validateCode = (userId: string, code: string) => api.post<boolean>(`${baseUrl}/${userId}/phone/token/${code}`)

const resendCode = (userId: string) => api.get<boolean>(`${baseUrl}/${userId}/phone/token`)

export const userService = {
  create: createUser,
  checkEmail: checkUserEmail,
  checkUsername: checkUserUsername,
  validateCode,
  resendCode,
}
