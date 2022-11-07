import Head from 'next/head'
import { NextPage } from 'next'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import { Layout } from 'src/layouts/auth'
import { Form } from 'src/styles/auth'
import { EmailOutlinedIcon } from 'src/assets/icons'
import Link from 'next/link'

const RecoverPassword: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Recuperação de Senha - Connis</title>
      </Head>

      <Form maxWidth={500}>
        <Typography variant="h1" color="primary">
          Recuperação de Senha
        </Typography>
        {false ? (
          <>
            <Typography variant="body2" mb={2}>
              Caso sua conta exista, te enviaremos um email.
            </Typography>

            <TextField
              variant="standard"
              label="Email da Empresa"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              fullWidth
            />

            <Button type="submit" variant="contained" fullWidth>
              Enviar email de recuperação
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" mb={2} textAlign="center">
              Caso sua conta exista, você receberá um email. Se não aparecer em alguns minutos, cheque sua caixa de
              spam.
            </Typography>

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

export default RecoverPassword
