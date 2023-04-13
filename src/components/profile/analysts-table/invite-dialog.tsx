import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { AnalystUser } from 'src/models/types'

import { userFakeData } from 'src/data/fake/user'

import { CloseIcon, PersonAddIcon, PersonIcon, SearchIcon } from 'src/assets/icons'
import { UserAvatar } from 'src/components/shared'
import { useLoadingBackdrop } from 'src/contexts'

type InviteAnalystSchema = {
  analyst: AnalystUser | null
}

// TODO: Removes fake data
const { analyst } = userFakeData
const analysts = [
  { ...analyst, name: 'Henrique Reis', username: 'henriqueReis' },
  { ...analyst, id: '2', name: 'Paulo Moraes', username: 'pauloMoraes' },
]

export const InviteAnalystDialog = () => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<InviteAnalystSchema>({
    resolver: zodResolver(inviteAnalystValidationSchema),
    defaultValues: {
      analyst: null,
    },
  })
  const { toggleLoading } = useLoadingBackdrop()

  // TODO: Adds the "Already invited" or "Already added" label

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<AnalystUser[]>([])
  const [loading, setLoading] = useState(false)

  const selectedAnalyst = watch('analyst')

  useEffect(() => {
    const fetchAnalysts = async () => {
      if (!inputValue) {
        setOptions([])
        return
      }

      try {
        setLoading(true)
        // TODO: Fetches the analysts from the API
        const filteredOptions = analysts.filter(analyst =>
          analyst.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        setOptions(filteredOptions)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysts()
  }, [inputValue])

  const onClose = () => setIsOpen(false)

  const onSubmit = (data: InviteAnalystSchema) => {
    try {
      toggleLoading()
      // TODO: invite analyst
      console.log({ data })
      setInputValue('')
      setOptions([])
      reset()
      onClose()
    } catch (error) {
      console.error(error)
      // TODO: toast error
    } finally {
      toggleLoading()
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} startIcon={<PersonAddIcon color="primary" />} size="small">
        Adicionar analista
      </Button>

      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle textAlign="center" mb={1}>
          <PersonIcon sx={{ textAlign: 'center' }} />
          <br />
          Adicione um analista para sua empresa
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!selectedAnalyst ? (
              <Controller
                control={control}
                name="analyst"
                render={({ field: { value, onChange, ...rest } }) => (
                  <Autocomplete
                    {...rest}
                    open={inputValue.length > 0}
                    value={value}
                    options={options}
                    loading={loading}
                    filterOptions={newValue => newValue}
                    getOptionLabel={option => option.name}
                    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                    onChange={(_, value) => onChange(value)}
                    noOptionsText="Nenhum analista encontrado"
                    popupIcon={null}
                    renderInput={({ InputProps, ...params }) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Pesquise pelo nome ou email do analista"
                        InputProps={{
                          ...InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <UserAvatar src={option.image} name={option.name} size={28} />
                          <Box>
                            <Typography variant="body2" lineHeight="1" fontWeight={600}>
                              {option.name}
                            </Typography>
                            <Typography variant="caption">@{option.username}</Typography>
                          </Box>
                        </Stack>
                      </li>
                    )}
                    fullWidth
                  />
                )}
              />
            ) : (
              <Alert
                icon={<UserAvatar src={selectedAnalyst.image} name={selectedAnalyst.name} size={28} />}
                severity="info"
                closeText="Trocar analista"
                onClose={() => setValue('analyst', null)}
                sx={{
                  border: '1px solid',
                  borderColor: 'info.main',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="body2" lineHeight="1" fontWeight={600}>
                    {selectedAnalyst.name}
                  </Typography>
                  <Typography variant="caption">@{selectedAnalyst.username}</Typography>
                </Box>
              </Alert>
            )}

            <Divider sx={{ my: 2 }} />

            <Button type="submit" variant="contained" size="small" disabled={!selectedAnalyst} fullWidth>
              {!!selectedAnalyst
                ? `Envie o convite para ${selectedAnalyst?.name || 'o analista selecionado'}`
                : 'Selecione um analista para enviar o convite'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

const inviteAnalystValidationSchema = z.object({
  analyst: z
    .object({
      id: z.string(),
    })
    .nullable(),
})
