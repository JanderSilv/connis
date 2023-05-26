import { api } from '../api'

const baseUrl = '/image'

type ImageResponse = {
  id: string
  source: string
  description: string
}

const deleteImage = (imageId: string) => api.delete(`${baseUrl}/${imageId}`)

const getImage = (imageId: string) => api.get<ImageResponse>(`${baseUrl}/${imageId}`)

const uploadImage = (formData: FormData, description: string) =>
  api.post<ImageResponse>(`${baseUrl}/${description}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const imageService = {
  delete: deleteImage,
  get: getImage,
  upload: uploadImage,
}
