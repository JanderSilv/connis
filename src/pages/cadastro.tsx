import { KeyboardEvent, useRef, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'

import { UserType } from 'src/models/enums'

import { pages } from 'src/constants'
import { useLoadingBackdrop } from 'src/contexts'
import { debounceRegister } from 'src/helpers'
import { withPublic } from 'src/helpers/auth'
import { useToast } from 'src/hooks/useToast'
import { useStep } from 'src/hooks/sign-up'
import { UserSignUpSchema, userSignUpValidationSchema } from 'src/validations/user-sign-up'
import { userService } from 'src/services'

import { MaskedTextField } from 'src/components/shared'
import { Layout } from 'src/layouts/auth'

import {
  LockOutlinedIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  PersonOutlineIcon,
  BadgeOutlinedIcon,
  EmailOutlinedIcon,
  PhoneOutlinedIcon,
} from 'src/assets/icons'
import { Form } from 'src/styles/login'

const UserSignUp: NextPage = () => {
  const { replace } = useRouter()
  const { showToast } = useToast()
  const {
    register,
    control,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<UserSignUpSchema>({
    resolver: zodResolver(userSignUpValidationSchema),
    defaultValues: {
      type: UserType.CompanyAdmin,
    },
  })
  const { step, stepsCount, handleNextStep } = useStep(trigger)
  const { toggleLoading } = useLoadingBackdrop()

  const continueButtonRef = useRef<HTMLButtonElement>(null)

  const [shouldShowPassword, setShouldShowPassword] = useState(false)

  const isLastStep = step === stepsCount

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') continueButtonRef.current?.click()
  }

  const onSubmit = async (user: UserSignUpSchema) => {
    try {
      toggleLoading()
      const { data } = await userService.create({
        ...user,
        phone: `+55${user.phone.replace(/\D/g, '')}`,
      })
      replace(`${pages.confirmCode}?userId=${data.id}`)
    } catch (error) {
      console.error(error)
      showToast('Não foi possível fazer o cadastro. Tente novamente mais tarde.', 'error')
    } finally {
      toggleLoading()
    }
  }

  const textFieldProps: TextFieldProps = {
    variant: 'outlined',
    fullWidth: true,
    autoFocus: true,
    onKeyPress: handleEnterKey,
  }

  return (
    <Layout
      documentTitle="Cadastro"
      sx={{
        alignItems: {
          xs: 'center',
          md: 'flex-start',
        },
      }}
      showFooter
    >
      <Box width="100%" mx="auto">
        <Form onSubmit={handleSubmit(onSubmit)} maxWidth={440}>
          <Typography variant="h1" color="primary" mb={2}>
            Cadastro
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Nome"
              type="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: step !== 1 && !getFieldState('name').invalid && (
                  <InputAdornment position="end">✅</InputAdornment>
                ),
              }}
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...textFieldProps}
            />

            <Collapse in={step >= 2} mountOnEnter>
              <TextField
                label="Nome de usuário"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (() => {
                    if (step !== 2) {
                      if (!getFieldState('userName').invalid) return <InputAdornment position="end">✅</InputAdornment>
                    }
                  })(),
                }}
                {...debounceRegister('userName', trigger, register)}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                {...textFieldProps}
              />
            </Collapse>

            <Collapse in={step >= 3} mountOnEnter>
              <TextField
                label="E-mail"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: step !== 3 && !getFieldState('email').invalid && (
                    <InputAdornment position="end">✅</InputAdornment>
                  ),
                }}
                {...debounceRegister('email', trigger, register)}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...textFieldProps}
              />
            </Collapse>

            <Collapse in={step >= 4} mountOnEnter>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <MaskedTextField
                    variant="outlined"
                    label="Telefone"
                    mask="(00) 00000-0000"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: step !== 4 && !getFieldState('phone').invalid && (
                        <InputAdornment position="end">✅</InputAdornment>
                      ),
                    }}
                    {...field}
                    onKeyPress={handleEnterKey as any}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    autoFocus
                    fullWidth
                  />
                )}
              />
            </Collapse>

            <Collapse in={step >= 5} mountOnEnter>
              <TextField
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
                {...textFieldProps}
                onKeyPress={undefined}
                error={!!errors.password}
                helperText={
                  errors.password?.message ||
                  'Use oito ou mais caracteres com uma combinação de letras, números e símbolos'
                }
              />
            </Collapse>

            <Button
              ref={continueButtonRef}
              type={isLastStep ? 'submit' : 'button'}
              onClick={handleNextStep}
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              {isLastStep ? 'Cadastrar' : 'Continue'}
            </Button>
          </Stack>
        </Form>
      </Box>
    </Layout>
  )
}

export default UserSignUp

export const getServerSideProps = withPublic(async () => {
  return {
    props: {},
  }
}, true)
