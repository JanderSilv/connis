import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Typography, TextField, InputAdornment } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, loginSchemaValidation } from 'src/validations/login'

import { Link } from 'src/components/link'
import { GoogleIcon, LockIcon, MicrosoftIcon, PersonIcon } from 'src/assets/icons'
import { ForgotPasswordTypography, Form, OrTypography, Wrapper } from 'src/styles/login'

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchemaValidation),
  })

  const handleLogin = (data: LoginSchema) => {
    console.log(data)
  }

  return (
    <Wrapper>
      <Head>
        <title>Login - Connis</title>
      </Head>
      <Image src="/assets/logo/logo.svg" width="117" height="40" alt="Logo do Connis" />
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
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
          }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mt: 1 }}
          fullWidth
        />

        <Link
          href="/esqueci-a-senha"
          muiLinkProps={{
            width: '100%',
            variant: 'body2',
            color: 'text.primary',
            mb: 2,
            textAlign: 'right',
          }}
        >
          Esqueceu a senha?
        </Link>

        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>

        <OrTypography>Ou</OrTypography>

        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
          Entrar com o Google
        </Button>
        <Button variant="outlined" startIcon={<MicrosoftIcon />} fullWidth>
          Entrar com a Microsoft
        </Button>

        <ForgotPasswordTypography>
          Não possui uma conta? <Link href="/cadastro">Cadastre-se aqui</Link>
        </ForgotPasswordTypography>
      </Form>
    </Wrapper>
  )
}

export default Login
