import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Autocomplete, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserType } from 'src/models/enums'
import { User } from 'src/models/types'

import { useLoadingBackdrop } from 'src/contexts'
import { pages } from 'src/constants'
import { cnaesData } from 'src/data/ibge'

import { useCNPJDialog } from 'src/hooks/company-sign-up'
import { useToast } from 'src/hooks/useToast'
import { companySignUpValidationSchema, CompanySignUpSchema } from 'src/validations/company-sign-up'
import { companyService } from 'src/services'
import { slugify } from 'src/helpers'
import { withSession } from 'src/helpers/auth'

import { MaskedTextField } from 'src/components/shared'
import { Title } from 'src/components/company-sign-up'
import { Layout } from 'src/layouts/auth'

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
  user: User
}

const CompanySocialSignUp: NextPage<Props> = ({ user }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanySignUpSchema>({
    resolver: zodResolver(companySignUpValidationSchema),
    defaultValues: {
      cnae: {
        id: '',
        label: '',
      },
    },
  })
  const { replace } = useRouter()
  const { showToast } = useToast()
  const { toggleLoading } = useLoadingBackdrop()
  const { update } = useSession()
  const { fetchedCompany, setFetchedCompany, CNPJDialog } = useCNPJDialog(reset)

  const onSubmit = async (formData: CompanySignUpSchema) => {
    const { cnae, ...companyInput } = formData
    try {
      toggleLoading()
      await companyService.create({
        ...companyInput,
        slug: slugify(companyInput.name),
        cnaeId: cnae.id,
        adminId: user.id,
      })
      await update()
      showToast('Cadastro realizado com sucesso!', 'success')
      replace(pages.home)
    } catch (error) {
      console.error(error)
      showToast('Não foi possível fazer o cadastro. Tente novamente mais tarde.', 'error')
    } finally {
      toggleLoading()
    }
  }

  return (
    <Layout
      documentTitle="Cadastre sua empresa"
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

export const getServerSideProps = withSession(async context => {
  const { session } = context

  if (!session)
    return {
      redirect: { permanent: false, destination: pages.login },
    }

  const { user } = session

  if (user.type !== UserType.CompanyAdmin || !!user.companyId)
    return {
      redirect: {
        destination: pages.home,
        permanent: false,
      },
    }

  return {
    props: {
      user,
    },
  }
})
