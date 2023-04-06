import { useState } from 'react'

export const useAvatar = () => {
  const [avatarFile, setAvatarFile] = useState<string | File>()

  const handleEditAvatar = (file: string) => {
    setAvatarFile(file)
  }

  const handleUploadAvatar = (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)

    // TODO: upload avatar
    console.log('upload avatar', formData)
  }

  const handleDeleteAvatar = () => {
    // TODO: delete avatar
    console.log('delete avatar')
  }

  return {
    avatarFile,
    setAvatarFile,
    handleEditAvatar,
    handleUploadAvatar,
    handleDeleteAvatar,
  }
}
