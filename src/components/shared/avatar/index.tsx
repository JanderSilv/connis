import { useCallback, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
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

import { Company, ICT } from 'src/models/types'

import { useToast } from 'src/hooks'
import { useAvatar } from './useAvatar'
import { companyService, ictService, imageService, userService } from 'src/services'

import { useLoadingBackdrop } from 'src/contexts'

import { ChangeAvatarButton } from './styles'
import { CloseIcon, DeleteIcon, EditIcon, PhotoCameraIcon, RotateLeftIcon, RotateRightIcon } from 'src/assets/icons'

type UserAvatarProps = {
  name: string
  src?: string | null
  size?: number
  componentsProps?: {
    avatar?: AvatarProps
    image?: ImageProps
  }
} & (CanEditAvatarProps | CannotEditAvatarProps)

type CanEditAvatarProps = {
  canEdit?: boolean
  entityToEdit: Entity
}
type CannotEditAvatarProps = {
  canEdit?: false
  entityToEdit?: never
}

export type Entity = 'user' | 'ict' | 'company'

export const UserAvatar = (props: UserAvatarProps) => {
  const { name, src, size = 35, componentsProps, canEdit, entityToEdit } = props

  const alt = `Avatar de ${name}`

  const avatar = (
    <Avatar
      alt={alt}
      {...componentsProps?.avatar}
      sx={{
        width: size,
        height: size,
        bgcolor: 'primary.main',
        ...componentsProps?.avatar?.sx,
      }}
    >
      {!!src ? <Image src={src} width={size} height={size} alt={alt} {...componentsProps?.image} /> : name[0]}
    </Avatar>
  )

  if (!canEdit) return avatar

  return (
    <ChangeUserAvatar avatar={src} entityToEdit={entityToEdit} userName={name}>
      {avatar}
    </ChangeUserAvatar>
  )
}

type ChangeUserAvatarProps = {
  userName: string
  avatar?: string | null
  children: React.ReactNode
  entityToEdit: Entity
}

const AVATAR_SIZE = 260

const ChangeUserAvatar = (props: ChangeUserAvatarProps) => {
  const { avatar, children, userName, entityToEdit } = props

  const { avatarFile, setAvatarFile, handleEditAvatar } = useAvatar()
  const { data: session, update } = useSession()
  const { showToast } = useToast()
  const { toggleLoading } = useLoadingBackdrop()

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
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              alt={`Avatar de ${userName}`}
              style={{ borderRadius: '50%', objectFit: 'contain' }}
            />
          ) : (
            <Avatar
              alt={userName}
              sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, marginInline: 'auto', bgcolor: 'primary.main' }}
            />
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
          {!!avatar && (
            <Button
              color="inherit"
              startIcon={<DeleteIcon />}
              onClick={async () => {
                try {
                  toggleLoading()
                  const { user } = session!

                  await userService.deleteImage(user.id)
                  update({
                    ...session!,
                    user: { ...user, image: null },
                  })
                  await mutate(
                    `${userService.baseUrl}/${user.id}`,
                    {
                      ...user,
                      image: null,
                    },
                    {
                      revalidate: false,
                    }
                  )
                  closeDialog()
                } catch (error) {
                  showToast('Não foi possível deletar a imagem, tente novamente mais tarde.', 'error')
                } finally {
                  toggleLoading()
                }
              }}
            >
              Deletar Foto
            </Button>
          )}
        </DialogActions>

        <EditAvatarDialog
          image={avatarFile}
          entityToEdit={entityToEdit}
          onClose={closeDialog}
          cleanAvatarFile={cleanAvatarFile}
        />
      </Dialog>
    </>
  )
}

type EditAvatarDialogProps = {
  image?: File | string
  entityToEdit: Entity
  onClose: () => void
  cleanAvatarFile: () => void
}

const EditAvatarDialog = (props: EditAvatarDialogProps) => {
  const { image, onClose, cleanAvatarFile, entityToEdit } = props

  const avatarEditorRef = useRef<AvatarEditor>(null)

  const { get } = useSearchParams()
  const { data: session, update } = useSession()
  const { showToast } = useToast()
  const { toggleLoading } = useLoadingBackdrop()

  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [adjustment, setAdjustment] = useState(0)

  const { data: organization } = useSWRImmutable<Company | ICT>(() => {
    if (entityToEdit === 'user') return null
    return [entityToEdit === 'company' ? companyService.baseUrl : ictService.baseUrl, get('slug')]
  })

  if (!image) return null

  const { user } = session!

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
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
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
                async blob => {
                  if (!blob) return
                  const file = new File([blob], `avatar-${user.name}.jpeg`, { type: 'image/jpeg' })

                  const formData = new FormData()

                  formData.append('file', file)
                  toggleLoading()

                  let isOk = false
                  const organizationImage = organization?.image

                  try {
                    const { data: imageResponse } = await imageService.upload(formData, `Avatar de ${user.name}`)
                    switch (entityToEdit) {
                      case 'user':
                        {
                          await userService.changeImage(user.id, imageResponse.source)
                          await mutate(
                            `${userService.baseUrl}/${user.id}`,
                            {
                              ...user,
                              image: imageResponse.source,
                            },
                            {
                              revalidate: false,
                            }
                          )
                          update()
                        }
                        break
                      case 'company':
                        {
                          await companyService.update(user.companyId!, {
                            image: imageResponse.source,
                          })
                          await mutate(
                            [companyService.baseUrl, get('slug')],
                            {
                              ...organization,
                              image: imageResponse.source,
                            },
                            {
                              revalidate: false,
                            }
                          )
                        }
                        break
                      case 'ict': {
                        await ictService.update(user.ictId!, {
                          image: imageResponse.source,
                        })
                        await mutate(
                          [ictService.baseUrl, get('slug')],
                          {
                            ...organization,
                            image: imageResponse.source,
                          },
                          {
                            revalidate: false,
                          }
                        )
                      }
                    }
                    isOk = true
                    cleanAvatarFile()
                    showToast('Imagem alterada com sucesso!', 'success')
                    onClose()
                  } catch (error) {
                    showToast('Não foi possível trocar a imagem, tente novamente mais tarde.', 'error')
                  } finally {
                    toggleLoading()
                  }

                  if (!isOk) return
                  if (entityToEdit === 'user' && !!user.image) imageService.delete(user.image.split('/images/')[1])
                  if (entityToEdit !== 'user' && !!organizationImage)
                    imageService.delete(organizationImage.split('/images/')[1])
                },
                'image/jpeg',
                1
              )
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
