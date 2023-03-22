import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import { RecoverPasswordSchema, recoverPasswordSchemaValidation } from 'src/validations/recover-password'
import { Layout } from 'src/layouts/auth'
import { EmailOutlinedIcon } from 'src/assets/icons'
import { Form } from 'src/styles/auth'

const RecoverPassword: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RecoverPasswordSchema>({
    resolver: zodResolver(recoverPasswordSchemaValidation),
  })

  const onSubmit = (data: RecoverPasswordSchema) => {
    console.log(data)
  }

  return (
    <Layout>
      <Head>
        <title>Recuperação de Senha - Connis</title>
      </Head>

      <Form onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
        <Typography variant="h1" color="primary">
          Recuperação de Senha
        </Typography>
        {!isSubmitSuccessful ? (
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
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
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

            <Button component={Link} href="/login" variant="outlined" fullWidth>
              Voltar para o login
            </Button>
          </>
        )}
      </Form>
    </Layout>
  )
}

export default RecoverPassword
