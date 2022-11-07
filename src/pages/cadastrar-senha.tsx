import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import { Layout } from 'src/layouts/auth'
import { LockIcon, VisibilityIcon, VisibilityOffIcon } from 'src/assets/icons'
import { Form } from 'src/styles/auth'

const RegisterPassword: NextPage = () => {
  const { query } = useRouter()
  const [shouldShowPassword, setShouldShowPassword] = useState(false)
  const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = useState(false)

  const onSubmit = () => {
    console.log(query.token)
  }

  return (
    <Layout>
      <Head>
        <title>Cadastrar Senha - Connis</title>
      </Head>

      <Form onSubmit={onSubmit} maxWidth={500} textAlign="center">
        {false ? (
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

            <Link href="/login" passHref>
              <Button component="a" variant="outlined" fullWidth>
                Voltar para o login
              </Button>
            </Link>
          </>
        )}
      </Form>
    </Layout>
  )
}

export default RegisterPassword
