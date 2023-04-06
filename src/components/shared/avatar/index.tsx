import { useCallback, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import AvatarEditor from 'react-avatar-editor'
import {
  Avatar,
  AvatarProps,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

import { ChangeAvatarButton } from './styles'
import { CloseIcon, DeleteIcon, EditIcon, PhotoCameraIcon, RotateLeftIcon, RotateRightIcon } from 'src/assets/icons'
import { useAvatar } from './useAvatar'
import { useSession } from 'next-auth/react'

type UserAvatarProps = {
  name: string
  src?: string
  size?: number
  componentsProps?: {
    avatar?: AvatarProps
    image?: ImageProps
  }
  canEdit?: boolean
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { name, src, size = 35, componentsProps, canEdit } = props

  const alt = `Avatar de ${name}`

  const avatar = (
    <Avatar
      alt={alt}
      {...componentsProps?.avatar}
      sx={{ width: size, height: size, bgcolor: 'primary.main', ...componentsProps?.avatar?.sx }}
    >
      {src && <Image src={src} width={size} height={size} alt={alt} {...componentsProps?.image} />}
    </Avatar>
  )

  if (!canEdit) return avatar

  return (
    <ChangeUserAvatar avatar={src} userName={name}>
      {avatar}
    </ChangeUserAvatar>
  )
}

type ChangeUserAvatarProps = {
  userName: string
  avatar?: string
  children: React.ReactNode
}

const ChangeUserAvatar = (props: ChangeUserAvatarProps) => {
  const { avatar, children, userName } = props

  const { avatarFile, setAvatarFile, handleEditAvatar } = useAvatar()

  const avatarInputRef = useRef<HTMLInputElement>(null)

  const [openDialog, setOpenDialog] = useState(false)

  const closeDialog = useCallback(() => setOpenDialog(false), [])
  const cleanAvatarFile = useCallback(() => setAvatarFile(undefined), [setAvatarFile])

  return (
    <>
      <ChangeAvatarButton onClick={() => setOpenDialog(true)}>{children}</ChangeAvatarButton>
      <Dialog open={openDialog} onClose={closeDialog} fullWidth>
        <DialogTitle>Foto do Perfil</DialogTitle>

        <IconButton onClick={closeDialog} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon color="inherit" />
        </IconButton>

        <DialogContent sx={{ mt: 1, textAlign: 'center' }}>
          {!!avatar ? (
            <Image
              src={avatar}
              width={260}
              height={260}
              alt={`Avatar de ${userName}`}
              style={{ borderRadius: '50%', objectFit: 'contain' }}
            />
          ) : (
            <Avatar alt={userName} />
          )}
        </DialogContent>

        <DialogActions
          sx={{
            mt: 2,
            borderTop: '1px solid',
            borderColor: 'grey.800',
            color: 'grey.800',
            justifyContent: 'space-evenly',
          }}
        >
          {!!avatar && (
            <Button color="inherit" onClick={() => handleEditAvatar(avatar)} startIcon={<EditIcon />}>
              Editar
            </Button>
          )}
          <Button color="inherit" startIcon={<PhotoCameraIcon />} onClick={() => avatarInputRef.current?.click()}>
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              onChange={event => setAvatarFile(event.target.files?.[0])}
              hidden
            />
            Nova Foto
          </Button>
          <Button color="inherit" startIcon={<DeleteIcon />}>
            Deletar Foto
          </Button>
        </DialogActions>

        <EditAvatarDialog image={avatarFile} onClose={closeDialog} cleanAvatarFile={cleanAvatarFile} />
      </Dialog>
    </>
  )
}

type EditAvatarDialogProps = {
  image?: File | string
  onClose: () => void
  cleanAvatarFile: () => void
}

const EditAvatarDialog = (props: EditAvatarDialogProps) => {
  const { image, onClose, cleanAvatarFile } = props

  const avatarEditorRef = useRef<AvatarEditor>(null)

  const { data: session } = useSession()

  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [adjustment, setAdjustment] = useState(0)

  if (!image) return null

  return (
    <Dialog open={!!image} onClose={onClose} fullWidth>
      <DialogTitle>Foto do Perfil</DialogTitle>

      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseIcon color="inherit" />
      </IconButton>

      <DialogContent sx={{ mt: 1, p: 0, textAlign: 'center', backgroundColor: 'common.black' }}>
        <AvatarEditor
          ref={avatarEditorRef}
          image={image}
          width={260}
          height={260}
          borderRadius={200}
          scale={scale}
          rotate={rotate + adjustment}
          crossOrigin="anonymous"
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, flexDirection: 'column' }}>
        <Stack width="100%" direction="row" justifyContent="flex-end" spacing={1}>
          <IconButton
            aria-label="Rotaciona imagem 90° para direita"
            onClick={() => setRotate(prevRotate => prevRotate + 90)}
          >
            <RotateRightIcon />
          </IconButton>

          <IconButton
            aria-label="Rotaciona imagem 90° para esquerda"
            onClick={() => setRotate(prevRotate => prevRotate - 90)}
          >
            <RotateLeftIcon />
          </IconButton>
        </Stack>

        <Stack width="100%" mt={2} direction="row" spacing={2}>
          <Box flex={1}>
            <Typography component="h2" variant="body1">
              Zoom
            </Typography>
            <Slider
              aria-label="Zoom da imagem"
              value={scale}
              onChange={(_, newValue) => setScale(newValue as number)}
              step={0.01}
              min={1}
              max={2}
              valueLabelDisplay="auto"
              sx={{ flex: 1 }}
            />
          </Box>

          <Box flex={1}>
            <Typography component="h2" variant="body1">
              Ajustar
            </Typography>
            <Slider
              value={adjustment}
              onChange={(_, newValue) => setAdjustment(newValue as number)}
              aria-label="Ajustar"
              min={-45}
              max={45}
              valueLabelDisplay="auto"
              valueLabelFormat={value => `${value}°`}
              sx={{ flex: 1 }}
            />
          </Box>
        </Stack>

        <Stack width="100%" mt={2} direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="primary" onClick={cleanAvatarFile} size="small">
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!avatarEditorRef.current) return
              const canvas = avatarEditorRef.current.getImageScaledToCanvas()
              canvas.toBlob(
                blob => {
                  if (!blob) return
                  const file = new File([blob], `avatar-${session?.user.name}.jpeg`, { type: 'image/jpeg' })
                  console.log(file)
                },
                'image/jpeg',
                1
              )
              onClose()
            }}
            size="small"
          >
            Salvar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
