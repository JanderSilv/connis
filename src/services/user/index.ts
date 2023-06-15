import { User } from 'src/models/types'

import { api } from '../api'

type UserSignUpSchema = Omit<User, 'id' | 'createdAt'>

type LoginResponse = {
  jwtToken: string
}

export type ResetPasswordInput = {
  token: string
  newPassword: string
}

const baseUrl = '/user'

const changeUserImage = (userId: string, url: string) =>
  api.patch<User>(`${baseUrl}/${userId}/profile-image`, {
    url,
  })

const createUser = (user: UserSignUpSchema) => api.post<User>(baseUrl, user)

const checkUserEmail = (email: string) => api.get<boolean>(`${baseUrl}/check-email/${email}`)

const checkUserUsername = (username: string) => api.get<boolean>(`${baseUrl}/check-username/${username}`)

const deleteUser = (userId: string) => api.delete<User>(`${baseUrl}/${userId}`)

const deleteUserImage = (userId: string) => api.delete<User>(`${baseUrl}/${userId}/profile-image`)

const getByUsername = (username: string) =>
  api.get<User[]>(`${baseUrl}`, {
    params: {
      search: username,
    },
  })

const getByUsernameFetcher = (url: string) => api.get<User[]>(url).then(res => res.data[0])

const validateCode = (userId: string, code: string) => api.post<boolean>(`${baseUrl}/${userId}/phone/token/${code}`)

const resendCode = (userId: string) => api.get<boolean>(`${baseUrl}/${userId}/phone/token`)

const login = async (email: string, password: string) =>
  api.post<LoginResponse>(`${baseUrl}/auth`, { login: email, password })

const getCurrentUser = () => api.get<User>(`${baseUrl}/current`)

const requestPasswordReset = (email: string) => api.get(`${baseUrl}/${email}/password-reset`)

const resetPassword = (userId: string, data: ResetPasswordInput) =>
  api.patch(`${baseUrl}/${userId}/password-reset`, data)

export const userService = {
  baseUrl,
  changeImage: changeUserImage,
  create: createUser,
  checkEmail: checkUserEmail,
  checkUsername: checkUserUsername,
  delete: deleteUser,
  deleteImage: deleteUserImage,
  getByUsername,
  getByUsernameFetcher,
  getCurrent: getCurrentUser,
  login,
  validateCode,
  resendCode,
  requestPasswordReset,
  resetPassword,
}
