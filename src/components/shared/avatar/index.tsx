import { Avatar, AvatarProps } from '@mui/material'
import Image, { ImageProps } from 'next/image'

type UserAvatarProps = {
  name: string
  src?: string
  size?: number
  componentsProps?: {
    avatar?: AvatarProps
    image?: ImageProps
  }
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { name, src, size = 35, componentsProps } = props
  const alt = `Avatar de ${name}`

  return (
    <Avatar
      alt={alt}
      {...componentsProps?.avatar}
      sx={{ width: size, height: size, bgcolor: 'primary.main', ...componentsProps?.avatar?.sx }}
    >
      {src && <Image src={src} width={size} height={size} alt={alt} {...componentsProps?.image} />}
    </Avatar>
  )
}
