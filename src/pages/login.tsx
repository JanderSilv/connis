import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { pages } from 'src/constants'
import { withPublic } from 'src/helpers/auth/withPublic'
import { LoginSchema, loginSchemaValidation } from 'src/validations/login'

import { useLoadingBackdrop } from 'src/contexts'
import { Layout } from 'src/layouts/auth'
import { Link } from 'src/components/shared'
import { SocialLoginButtons } from 'src/components/social-login-buttons'

import { LockIcon, PersonIcon, VisibilityIcon, VisibilityOffIcon } from 'src/assets/icons'
import { ForgotPasswordTypography, Form } from 'src/styles/login'

const Login: NextPage = () => {
  const { toggleLoading } = useLoadingBackdrop()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemaValidation),
  })
  const { query } = useRouter()

  const [shouldShowPassword, setShouldShowPassword] = useState(false)

  const handleLogin = async (data: LoginSchema) => {
    try {
      toggleLoading()
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: (query.callbackUrl as string) || undefined,
      })
    } catch (error) {
      console.log({ error })
    } finally {
      toggleLoading()
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login - Connis</title>
      </Head>

      <Form onSubmit={handleSubmit(handleLogin)}>
        <Typography variant="h1" color="primary" mb={2}>
          Login
        </Typography>

        <TextField
          variant="outlined"
          label="Email"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Senha"
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
          sx={{ mt: 1 }}
          fullWidth
        />

        <Link href={pages.recoverPassword} width="100%" variant="body2" color="text.primary" mb={2} textAlign="right">
          Esqueceu a senha?
        </Link>

        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>

        <SocialLoginButtons mt={1} />

        <ForgotPasswordTypography>
          Não possui uma conta? <Link href={pages.signUp}>Cadastre-se aqui</Link>
        </ForgotPasswordTypography>
      </Form>
    </Layout>
  )
}

export default Login

export const getServerSideProps = withPublic(async () => {
  return {
    props: {},
  }
}, true)
