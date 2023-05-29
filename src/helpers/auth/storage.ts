import { parseCookies, setCookie } from 'nookies'

export enum AuthStorageKeys {
  Token = '@connis/token',
}

const getToken = () => parseCookies(null)[AuthStorageKeys.Token] || null

const storeToken = (token: string) =>
  setCookie(null, AuthStorageKeys.Token, token, {
    maxAge: 60 * 60 * 24, // 24 hours
  })

export const authStorage = {
  getToken,
  storeToken,
}
