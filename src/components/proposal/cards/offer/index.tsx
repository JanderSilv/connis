import Link from 'next/link'
import { Avatar, Badge, Box, ListItem, Stack, Typography } from '@mui/material'

import { proposalTypeOptions } from 'src/data/proposal'
import { formatDate } from 'src/helpers/formatters'
import { Offer } from 'src/models/types'

import { UserAvatar } from 'src/components/shared'
import { OfferStatusChip } from '../../chip-status'
import { BadgeContainer, ContentContainer, Description, Header, ListItemButton } from '../styles'

export type OfferCardProps = {
  href?: string
  unseenActivities: number
} & Offer

export const OfferCard = (props: OfferCardProps) => {
  const { createdAt, updatedAt, message, company, status, type, unseenActivities, proposal, href } = props

  const { icon: Icon, title: proposalTitle } = proposalTypeOptions[type]

  return (
    <ListItem disableGutters>
      <Link href={href || `/proposta/${proposal?.id}`} passHref>
        <ListItemButton LinkComponent="a">
          <ContentContainer>
            <OfferStatusChip status={status} sx={{ mb: 1, display: { sm: 'none' } }} />
            <Header mb={1}>
              <Stack direction="row" alignItems="center" gap={2}>
                <UserAvatar name={company.name} src={company.image} size={25} />
                <Typography component="h3" variant="h5">
                  {company.name}
                </Typography>
              </Stack>
              <Box display="flex" alignItems="center" gap={1}>
                <OfferStatusChip status={status} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
              </Box>
            </Header>
            <Typography variant="h3">{proposal?.title}</Typography>

            <Description>{message}</Description>

            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography component="time" variant="caption">
                {!!updatedAt ? 'Atualizado' : 'Criado'} {formatDate.distanceToNow(new Date(updatedAt || createdAt))}
              </Typography>
            </Box>
          </ContentContainer>

          <Badge badgeContent={unseenActivities} max={9} color="error">
            <BadgeContainer>
              <Icon color="inherit" fontSize="large" />
              <Typography component="span" color="inherit">
                {proposalTitle}
              </Typography>
            </BadgeContainer>
          </Badge>
        </ListItemButton>
      </Link>
    </ListItem>
  )
}
