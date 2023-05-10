import { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material'

import { pages } from 'src/constants'
import { toastHttpError } from 'src/helpers/shared'
import { withPublic } from 'src/helpers/auth'
import { useToast } from 'src/hooks'
import { userService } from 'src/services'
import { UserConfirmCodeSchema, userConfirmCodeSchema } from 'src/validations/user-confirm-code'

import { useLoadingBackdrop } from 'src/contexts'
import { MaskedTextField } from 'src/components/shared'
import { Layout } from 'src/layouts/auth'

import { Form } from 'src/styles/login'

type ConfirmCodeProps = {
  setHasValidatedThePhone: (hasValidatedThePhone: boolean) => void
}

const ConfirmCode = (props: ConfirmCodeProps) => {
  const { setHasValidatedThePhone } = props

  const { replace } = useRouter()
  const { get } = useSearchParams()
  const { toggleLoading } = useLoadingBackdrop()
  const { showToast } = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isValidating, isSubmitting, isSubmitSuccessful },
    setValue,
    setFocus,
  } = useForm<UserConfirmCodeSchema>({
    resolver: zodResolver(userConfirmCodeSchema),
  })

  const [selectedAll, setSelectedAll] = useState(true)
  const [hasResentTheCode, setHasResentTheCode] = useState(false)

  const userId = get('userId')

  const error = Array.isArray(errors.code) ? errors.code.find(error => !!error?.message) : errors.code

  const onSubmit = useCallback(
    async (data: UserConfirmCodeSchema) => {
      if (!userId) return
      toggleLoading()
      try {
        await userService.validateCode(userId, data.code.join(''))
        showToast('Telefone validado com sucesso!', 'success')
        setHasValidatedThePhone(true)
      } catch (error) {
        toastHttpError(error)
      } finally {
        toggleLoading()
      }
    },
    [setHasValidatedThePhone, showToast, toggleLoading, userId]
  )

  useEffect(() => {
    const autoSubmit = async () => {
      if (isSubmitSuccessful || isSubmitting || isValidating) return
      if (isValid) handleSubmit(onSubmit)()
    }

    autoSubmit()
  }, [handleSubmit, isSubmitSuccessful, isSubmitting, isValid, isValidating, onSubmit])

  if (!userId) {
    replace(pages.login)
    return null
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} maxWidth={440}>
      <Typography variant="h1" color="primary" textAlign="center">
        Confirmar o código
      </Typography>

      <Typography mb={2} variant="body2" textAlign="center">
        Enviamos um código para o seu telefone. Digite-o abaixo para finalizar o cadastro.
      </Typography>

      <Box mb={2}>
        <Stack direction="row" spacing={1}>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <Controller
              key={index}
              control={control}
              name={`code.${index}`}
              render={({ field: { value, onChange, ref, ...rest } }) => (
                <MaskedTextField
                  mask={Number}
                  inputMode="numeric"
                  inputRef={ref}
                  {...rest}
                  value={value}
                  onAccept={newValue => {
                    onChange(newValue)
                    if (newValue) setFocus(`code.${index + 1}`)
                  }}
                  onFocus={event => event.target.select(0, 1)}
                  onKeyDown={event => {
                    if (selectedAll && event.key === 'Backspace') {
                      setFocus('code.0')
                      setValue('code', ['', '', '', '', '', ''])
                    }
                    setSelectedAll(false)
                    const { value: inputValue } = event.target as HTMLInputElement
                    if (event.key === 'Backspace' && !inputValue) setFocus(`code.${index - 1}`)
                    if (event.ctrlKey && event.key === 'a') setSelectedAll(true)
                  }}
                  onPaste={event => {
                    const inputValue = event.clipboardData.getData('Text')
                    if (inputValue.length === 6) {
                      event.preventDefault()
                      const newValue = inputValue.split('')
                      setValue('code', newValue)
                      setFocus(`code.5`)
                    }
                  }}
                  inputProps={{
                    maxLength: 1,
                  }}
                  variant="outlined"
                  error={!!error}
                  size={'small' as any}
                  sx={{
                    '& input': {
                      textAlign: 'center',
                      padding: 1,
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>
        {!!error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
      </Box>

      <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
        Confirmar
      </Button>

      <Button
        onClick={async () => {
          try {
            toggleLoading()
            await userService.resendCode(userId)
            setHasResentTheCode(true)
            showToast('Código reenviado com sucesso.', 'success')
          } catch (error) {
            toastHttpError(error)
          } finally {
            toggleLoading()
          }
        }}
        disabled={hasResentTheCode}
        size="small"
        sx={{ mt: 1 }}
        fullWidth
      >
        Reenviar código
      </Button>
    </Form>
  )
}

const ConfirmCodePage: NextPage = () => {
  const [hasValidatedThePhone, setHasValidatedThePhone] = useState(true)

  return (
    <Layout
      documentTitle="Confirmar o código"
      sx={{
        alignItems: {
          xs: 'center',
          md: 'flex-start',
        },
      }}
      showFooter
    >
      {!hasValidatedThePhone ? (
        <ConfirmCode setHasValidatedThePhone={setHasValidatedThePhone} />
      ) : (
        <Form component="div" maxWidth={440}>
          <Typography component="h1" variant="h2" color="primary" textAlign="center">
            Telefone validado com sucesso!
          </Typography>

          <Typography mb={2} textAlign="center">
            Você recebeu um e-mail para finalizar o cadastro. Caso já tenha confirmado, clique no botão abaixo para
            fazer o login.
          </Typography>

          <Button component={Link} href={pages.login} variant="outlined" fullWidth>
            Ir para o login
          </Button>
        </Form>
      )}
    </Layout>
  )
}

export default ConfirmCodePage

export const getServerSideProps = withPublic(async context => {
  const { userId } = context.query

  if (!userId)
    return {
      redirect: {
        destination: pages.login,
        permanent: false,
      },
    }

  return {
    props: {},
  }
}, true)
