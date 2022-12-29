import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Autocomplete, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { cnaesData } from 'src/data/ibge'
import { companySignUpValidationSchema, CompanySignUpSchema } from 'src/validations/company-sign-up'

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
  VisibilityIcon,
  VisibilityOffIcon,
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

const CompanySignUp: NextPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySignUpSchema>({
    resolver: zodResolver(companySignUpValidationSchema),
    defaultValues: {
      cnae: null,
    },
  })

  const [shouldShowPassword, setShouldShowPassword] = useState(false)
  const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = useState(false)

  const onSubmit = (data: CompanySignUpSchema) => {
    console.log(data)
  }

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
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />

            <Controller
              control={control}
              name="cnpj"
              render={({ field }) => (
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
                  {...field}
                  error={!!errors.cnpj}
                  helperText={errors.cnpj?.message}
                  fullWidth
                />
              )}
            />

            <TextField
              variant="standard"
              label="E-mail"
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
              fullWidth
            />

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
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
                  {...field}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              control={control}
              name="cnae"
              render={({ field: { value, onChange, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  value={value}
                  options={[value, ...cnaesData]}
                  filterOptions={() => cnaesData}
                  noOptionsText="Nenhum CNAE encontrado"
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="CNAE - Código de Atividade"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.cnae}
                      helperText={errors.cnae?.message}
                    />
                  )}
                  onChange={(_, value) => onChange(value)}
                  fullWidth
                />
              )}
            />

            <TextField
              variant="standard"
              label="Senha"
              type={shouldShowPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
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
              fullWidth
            />

            <TextField
              variant="standard"
              label="Confirmar a senha"
              type={shouldShowConfirmPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
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

            <SocialLoginButtons
              mt={2}
              maxWidth={300}
              mx="auto"
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

export default CompanySignUp
