import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { destroyCookie } from 'nookies'
import { checkIsServer } from 'src/helpers/shared'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CONNIS_API_KEY}/api`,
  paramsSerializer: params => {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item))
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value))
      } else if (typeof value !== 'undefined' && value !== null) {
        searchParams.append(key, value as string)
      }
    })

    return searchParams.toString()
  },
})

api.interceptors.request.use(
  async config => {
    const session = await getSession()

    if (!session || !config.headers) return config

    config.headers['Authorization'] = `Bearer ${session.accessToken}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (checkIsServer()) destroyCookie(null, 'next-auth.session-token')
      else signOut()
    }

    return Promise.reject(error)
  }
)
