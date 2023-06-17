import { useState } from 'react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import { pages } from 'src/constants'
import { useLoadingBackdrop } from 'src/contexts'
import { withPublic } from 'src/helpers/auth'
import { toastHttpError } from 'src/helpers/shared'
import { useToast } from 'src/hooks'
import { userService } from 'src/services'
import { RegisterPasswordSchema, registerPasswordSchemaValidation } from 'src/validations/register-password'

import { Layout } from 'src/layouts/auth'

import { LockIcon, VisibilityIcon, VisibilityOffIcon } from 'src/assets/icons'
import { Form } from 'src/styles/auth'

const RegisterPasswordPage: NextPage = () => {
  const { get } = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterPasswordSchema>({
    resolver: zodResolver(registerPasswordSchemaValidation),
  })
  const { showToast } = useToast()
  const { toggleLoading } = useLoadingBackdrop()

  const [shouldShowPassword, setShouldShowPassword] = useState(false)
  const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = useState(false)

  const onSubmit = async (data: RegisterPasswordSchema) => {
    try {
      toggleLoading()
      await userService.resetPassword(get('user')!, {
        token: get('token')!.replaceAll(' ', '+'),
        newPassword: data.password,
      })
      showToast('Senha atualizada com sucesso!', 'success')
    } catch (error) {
      toastHttpError(error)
    } finally {
      toggleLoading()
    }
  }

  return (
    <Layout>
      <Head>
        <title>Cadastrar Senha - Connis</title>
      </Head>

      <Form onSubmit={handleSubmit(onSubmit)} maxWidth={500} textAlign="center">
        {!isSubmitSuccessful ? (
          <>
            <Typography variant="h1" color="primary" mb={2}>
              Cadastrar nova senha
            </Typography>

            <TextField
              variant="standard"
              label="Nova senha"
              type={shouldShowPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={shouldShowPassword ? 'Esconder Senha' : 'Mostrar Senha'}
                      onClick={() => setShouldShowPassword(prevState => !prevState)}
                    >
                      {shouldShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 1 }}
              fullWidth
            />

            <TextField
              variant="standard"
              label="Confirmar a senha"
              type={shouldShowConfirmPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={shouldShowConfirmPassword ? 'Esconder Senha' : 'Mostrar Senha'}
                      onClick={() => setShouldShowConfirmPassword(prevState => !prevState)}
                    >
                      {shouldShowConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('passwordConfirmation')}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
              sx={{
                mb: 2,
              }}
              fullWidth
            />

            <Button type="submit" variant="contained" fullWidth>
              Cadastrar
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h2" component="h1" color="primary" mb={1}>
              Senha alterada com sucesso
            </Typography>

            <Typography mb={2}>Sua senha foi salva, você já pode fazer o login.</Typography>

            <Button component={Link} href="/login" variant="outlined" fullWidth>
              Voltar para o login
            </Button>
          </>
        )}
      </Form>
    </Layout>
  )
}

export default RegisterPasswordPage

export const getServerSideProps = withPublic(async context => {
  const { token, user } = context.query

  if (!token || !user)
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
