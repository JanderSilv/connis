import axios from 'axios'
import { getSession } from 'next-auth/react'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CONNIS_API_KEY}/api`,
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
