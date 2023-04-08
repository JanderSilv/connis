import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Session, getServerSession } from 'next-auth'
import { Autocomplete, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { authOptions } from './api/auth/[...nextauth]'
import { pages } from 'src/constants'
import { cnaesData } from 'src/data/ibge'
import { useCNPJDialog } from 'src/hooks/company-sign-up'
import { useToast } from 'src/hooks/useToast'
import { checkUserIsCompany } from 'src/helpers/users'
import { jsonBinApi } from 'src/services/json-bin'
import { companySocialSignUpValidationSchema, CompanySocialSignUpSchema } from 'src/validations/company-sign-up'

import { Layout } from 'src/layouts/auth'
import { MaskedTextField } from 'src/components/shared'
import { Title } from 'src/components/company-sign-up'
import {
  AssignmentOutlinedIcon,
  BusinessOutlinedIcon,
  EditIcon,
  EmailOutlinedIcon,
  PersonOutlineIcon,
  PhoneOutlinedIcon,
} from 'src/assets/icons'
import { theme } from 'src/styles/theme'
import { Form, LeftContainer, Wrapper } from 'src/styles/company-sign-up'

type Props = {
  session: Session
}

const CompanySocialSignUp: NextPage<Props> = ({ session }) => {
  const { replace } = useRouter()
  const { showToast } = useToast()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanySocialSignUpSchema>({
    resolver: zodResolver(companySocialSignUpValidationSchema),
    defaultValues: {
      cnae: {
        id: '',
        label: '',
      },
      email: session?.user?.email || '',
      image: session?.user?.image,
    },
  })
  const { fetchedCompany, setFetchedCompany, CNPJDialog } = useCNPJDialog(reset, session)

  const onSubmit = async (formData: CompanySocialSignUpSchema) => {
    try {
      await jsonBinApi.post('/b', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2b$10$AZS8O9vbnQ22oOD6kb3cDucYvYwySweKMgOCr5voMV51D/zKISEt6',
          'X-Bin-Name': formData.name,
          'X-Collection-Id': '63ae05d715ab31599e27ac7e',
        },
      })
      replace(pages.login)
    } catch (error) {
      console.error(error)
      showToast('Não foi possível fazer o cadastro. Tente novamente mais tarde.', 'error')
    }
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

      <CNPJDialog />

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
              Complete o seu cadastro e junte-se a melhor plataforma de conexão e inovação entre empresas.
            </Typography>
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
              disabled={!!fetchedCompany?.name}
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Trocar CNPJ" onClick={() => setFetchedCompany(null)} size="small">
                          <EditIcon color="primary" fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                  error={!!errors.cnpj}
                  helperText={errors.cnpj?.message}
                  disabled={!!fetchedCompany?.cnpj}
                  fullWidth
                />
              )}
            />

            <TextField
              variant="standard"
              label="E-mail"
              type="email"
              inputMode="email"
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
              disabled
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
                  inputMode="numeric"
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
                  disabled={!!fetchedCompany?.cnae?.id}
                  fullWidth
                />
              )}
            />

            <Button type="submit" variant="contained" fullWidth>
              Cadastrar
            </Button>
          </Form>
        </section>
      </Wrapper>
    </Layout>
  )
}

export default CompanySocialSignUp

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !checkUserIsCompany(session.user) || (checkUserIsCompany(session.user) && !!session.user.cnpj))
    return {
      redirect: {
        destination: pages.home,
        permanent: false,
      },
    }

  return {
    props: {
      session,
    },
  }
}
