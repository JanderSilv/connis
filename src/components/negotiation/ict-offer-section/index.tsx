import Link from 'next/link'
import { BoxProps, Button, Chip, Stack, Typography } from '@mui/material'

import { ICTOffer } from 'src/models/types'
import { Section } from 'src/styles/proposal'
import { UserAvatar } from 'src/components/shared'
import { useConfirmDialog } from 'src/contexts/confirm-dialog'

type ICTOfferProps = {
  ictOffer: ICTOffer
  boxProps?: BoxProps
}

export const ICTOfferSection = (props: ICTOfferProps) => {
  const { ictOffer, boxProps } = props
  const { description, suggestedFundingAgencies, user } = ictOffer

  const { handleOpenConfirmDialog } = useConfirmDialog()

  return (
    <Section {...boxProps}>
      <Stack component="header" direction="row" spacing={1} alignItems="center">
        <UserAvatar src={user.image} name={user.name} size={20} />
        <Typography variant="h3" component="h2">
          Oferta da ICT Cimatec
        </Typography>
      </Stack>

      <Typography mt={1}>{description}</Typography>

      <Typography variant="h4" component="h3" mt={2}>
        Agências de fomento sugeridas
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        {suggestedFundingAgencies.map(suggestedFundingAgency => (
          <Chip key={suggestedFundingAgency} label={suggestedFundingAgency} color="default" />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} mt={4} justifyContent="space-between">
        <Button component={Link} href={`/ict/${user.slug}`} variant="outlined" size="small">
          Ver perfil da ICT
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() =>
              handleOpenConfirmDialog({
                title: `Rejeitar oferta da ICT ${user.name}`,
                confirmButton: {
                  onClick: () => {
                    // TODO: Implements the reject offer
                    console.log('Rejeitar oferta')
                  },
                },
              })
            }
          >
            Rejeitar
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              handleOpenConfirmDialog({
                title: `Aceitar oferta da ICT ${user.name}`,
                message:
                  'Caso a outra empresa também aceite a oferta, a ICT entrará no chat para participar da negociação.',
                confirmButton: {
                  onClick: () => {
                    // TODO: Implements the accept offer
                    console.log('Aceitar oferta')
                  },
                },
              })
            }
          >
            Aceitar
          </Button>
        </Stack>
      </Stack>
    </Section>
  )
}
