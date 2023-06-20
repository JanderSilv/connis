import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { User, UserPermission } from 'src/models/types'

import { fakeData } from 'src/data/fake'

import { DialogCloseButton, SlideTransition } from 'src/components/shared'

import { FingerprintIcon } from 'src/assets/icons'

type AnalystPermissionsDialogProps = {
  analyst: User
  open: boolean
  onClose: () => void
}

type GroupPermission = {
  key: string
  name: string
  permissions: {
    key: string
    title: string
    value: boolean
  }[]
}

const { userPermissions: userPermissionsData } = fakeData

export const AnalystPermissionsDialog = (props: AnalystPermissionsDialogProps) => {
  const { open, onClose, analyst } = props

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [permissionsGroups, setPermissionsGroups] = useState<GroupPermission[]>([])

  useEffect(() => {
    // TODO: fetch permissions from server
    const auxPermissionsGroups = makePermissionsGroups(userPermissionsData)
    setPermissionsGroups(auxPermissionsGroups)
  }, [])

  const handleSave = () => {
    try {
      const data = permissionsGroups.map(group => ({
        key: group.key,
        value: group.permissions
          .filter(permission => permission.value)
          .map(permission => permission.key)
          .join(''),
      }))
      console.log({ data })
      onClose()
    } catch (error) {
      console.error(error)
      // TODO: toast error message
    }
  }

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={SlideTransition} maxWidth="lg">
      <DialogCloseButton onClick={onClose} />
      <DialogTitle textAlign="center">
        <FingerprintIcon color="primary" fontSize="large" />
        <br />
        Permissões de {analyst.name}
      </DialogTitle>
      <DialogContent>
        <Stack mt={2} mb={1} direction="row" flexWrap="wrap" gap={[2, 3]}>
          {permissionsGroups.map((permissionsGroup, permissionsGroupIndex) => (
            <>
              <Box
                width={{
                  xs: '100%',
                  sm: 'fit-content',
                }}
                key={permissionsGroup.name}
              >
                <Typography component="h3" variant="h4" mb={1}>
                  {permissionsGroup.name}
                </Typography>

                {permissionsGroup.permissions.map((permission, permissionIndex) => (
                  <FormControlLabel
                    key={`${permission.key}.${permission.title}`}
                    label={permission.title}
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={permission.value}
                        onChange={event => {
                          const { checked } = event.target
                          setPermissionsGroups(prev => {
                            const aux = [...prev]
                            aux[permissionsGroupIndex].permissions[permissionIndex].value = checked
                            return aux
                          })
                        }}
                        inputProps={{ 'aria-label': `${permission.title} ${permissionsGroup.name}` }}
                      />
                    }
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  />
                ))}
              </Box>
              {permissionsGroup !== permissionsGroups[permissionsGroups.length - 1] && (
                <Divider orientation={isMobile ? 'horizontal' : 'vertical'} variant="fullWidth" flexItem />
              )}
            </>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave} size="small" fullWidth>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const makePermissionsGroups = (userPermissions: UserPermission[]) =>
  userPermissions.reduce((acc, permission) => {
    const permissionKeys = permission.value.split('')

    const allowedPermissions = permissionKeys.map(key => ({
      key,
      title: permission.labels[key],
      value: true,
    }))
    const deniedPermissions = Object.keys(permission.labels)
      .filter(key => !permissionKeys.includes(key))
      .map(key => ({
        key,
        title: permission.labels[key],
        value: false,
      }))

    acc.push({
      key: permission.key,
      name: permission.name,
      permissions: [...allowedPermissions, ...deniedPermissions],
    })

    return acc
  }, [] as GroupPermission[])

export const useAnalystPermissionsDialog = () => {
  const [analyst, setAnalyst] = useState<User | null>(null)

  const open = useCallback((analyst: User) => setAnalyst(analyst), [])
  const close = useCallback(() => setAnalyst(null), [])

  return {
    handleOpenAnalystPermissionsDialog: open,
    handleCloseAnalystPermissionsDialog: close,
    AnalystPermissionsDialog: useCallback(
      () => (analyst ? <AnalystPermissionsDialog analyst={analyst} open={!!analyst} onClose={close} /> : null),
      [analyst, close]
    ),
  }
}
