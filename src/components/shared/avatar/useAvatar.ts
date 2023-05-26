import { useState } from 'react'

export const useAvatar = () => {
  const [avatarFile, setAvatarFile] = useState<string | File>()

  const handleEditAvatar = (file: string) => setAvatarFile(file)

  return {
    avatarFile,
    setAvatarFile,
    handleEditAvatar,
  }
}
