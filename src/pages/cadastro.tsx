import { NextPage } from 'next'
import Head from 'next/head'
import { Autocomplete, Button, InputAdornment, TextField, Typography } from '@mui/material'

import { Layout } from 'src/layouts/auth'
import { Link } from 'src/components/link'
import { MaskedTextField } from 'src/components/shared'
import { SocialLoginButtons } from 'src/components/social-login-buttons'
import {
  AssignmentOutlinedIcon,
  BusinessOutlinedIcon,
  EmailOutlinedIcon,
  LockOutlinedIcon,
  PersonOutlineIcon,
  PhoneOutlinedIcon,
} from 'src/assets/icons'
import { theme } from 'src/styles/theme'
import { Form, LeftContainer, Wrapper } from 'src/styles/company-sign-up'

type TitleProps = {
  isDesktop?: boolean
}
const Title = ({ isDesktop = false }: TitleProps) => (
  <Typography
    variant="h1"
    color="primary"
    mb={1}
    sx={{
      display: isDesktop
        ? {
            xs: 'none',
            md: 'block',
          }
        : {
            xs: 'block',
            md: 'none',
          },
    }}
  >
    Cadastro
  </Typography>
)

const CompanyRegister: NextPage = () => {
  return (
    <Layout
      illustration={{
        position: 'left',
        breakpoint: 'md',
      }}
      sx={{
        alignItems: {
          xs: 'center',
          md: 'flex-start',
        },
      }}
    >
      <Head>
        <title>Cadastro - Connis</title>
      </Head>

      <Wrapper>
        <LeftContainer>
          <div>
            <Title />
            <Typography
              fontSize={{
                xs: theme.typography.pxToRem(20),
                md: theme.typography.pxToRem(36),
              }}
              lineHeight="1.3"
            >
              Junte-se a melhor plataforma de conexão e inovação entre empresas.
            </Typography>
            <Typography component="span" mt={1} display="inline-block">
              Já possui uma conta? <Link href="/login">Faça o Login aqui.</Link>
            </Typography>

            <SocialLoginButtons
              mt={2}
              maxWidth={300}
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            />
          </div>
        </LeftContainer>
        <section>
          <Form>
            <Title isDesktop />
            <TextField
              variant="standard"
              label="Nome da Empresa"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <MaskedTextField
              variant="standard"
              label="CNPJ da Empresa"
              mask="00.000.000/0000-00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              variant="standard"
              label="E-mail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <MaskedTextField
              variant="standard"
              label="Telefone"
              mask="(00) 00000-0000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <Autocomplete
              options={[]}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  label="CNAE - Código de Atividade"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              onChange={(_, value) => console.log(value)}
              fullWidth
            />

            <TextField
              variant="standard"
              label="Senha"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              variant="standard"
              label="Confirmar a senha"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
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

            <SocialLoginButtons
              mt={2}
              maxWidth={300}
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </Form>
        </section>
      </Wrapper>
    </Layout>
  )
}

export default CompanyRegister
