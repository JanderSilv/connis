import axios from 'axios'

export const jsonBinApi = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
})
