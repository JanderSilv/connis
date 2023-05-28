import Link from 'next/link'
import { Badge, Box, CardActionArea, CardContent, ListItem, Stack, Typography } from '@mui/material'

import { proposalTypeOptions } from 'src/data/proposal'
import { formatDate } from 'src/helpers/formatters'
import { Negotiation } from 'src/models/types'

import { UserAvatar } from 'src/components/shared'
import { OfferStatusChip } from '../../chip-status'
import { BadgeContainer, Card, ContentContainer, Description, Header, ListItemButton } from '../styles'

export type NegotiationCardProps = {
  negotiation: Negotiation
  href?: string
  unseenActivities: number
  layout?: 'row' | 'card'
  hideTitle?: boolean
}

export const NegotiationCard = (props: NegotiationCardProps) => {
  const { negotiation, href, unseenActivities, layout = 'row', hideTitle } = props
  const { interested, proposal, offers } = negotiation

  const lastOffer = offers[0]

  if (!lastOffer) return null

  const { offerStatus, description, createdAt, updatedAt } = lastOffer

  const { icon: Icon, title: proposalTitle } = proposalTypeOptions[0]

  const isRowLayout = layout === 'row'

  const badgeContent = (
    <>
      <Icon color="inherit" fontSize="large" />
      <Typography component="span" color="inherit">
        {proposalTitle}
      </Typography>
    </>
  )

  const content = (
    <>
      {isRowLayout && <OfferStatusChip status={offerStatus} sx={{ mb: 1, display: { sm: 'none' } }} />}
      <Header mb={1}>
        <Stack direction="row" alignItems="center" gap={2}>
          <UserAvatar name={interested.name} src={interested.image} size={25} />
          <Typography component="h3" variant="h5">
            {interested.name}
          </Typography>
        </Stack>
        {isRowLayout && <OfferStatusChip status={offerStatus} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
      </Header>
      {!hideTitle && (
        <Typography component="h3" variant="h4">
          {proposal?.title}
        </Typography>
      )}

      <Description>{description}</Description>

      <Box mt={1} display="flex" alignItems="center" gap={1}>
        <Typography component="time" variant="caption">
          {!!updatedAt ? 'Atualizado' : 'Criado'} {formatDate.distanceToNow(new Date(updatedAt || createdAt))}
        </Typography>
      </Box>
    </>
  )

  if (!isRowLayout)
    return (
      <Card sx={{ width: '100%' }}>
        <CardActionArea component={Link} href={`/proposta/${proposal?.id}/negociacao/${negotiation.id}`}>
          <BadgeContainer layout="card">
            {badgeContent}
            <OfferStatusChip status={offerStatus} sx={{ position: 'absolute', top: 10, right: 10 }} />
          </BadgeContainer>
          <CardContent>{content}</CardContent>
        </CardActionArea>
      </Card>
    )

  return (
    <ListItem disableGutters>
      <ListItemButton component={Link} href={href || `/proposta/${proposal?.id}`}>
        <ContentContainer>{content}</ContentContainer>

        <Badge badgeContent={unseenActivities} max={9} color="error">
          <BadgeContainer>{badgeContent}</BadgeContainer>
        </Badge>
      </ListItemButton>
    </ListItem>
  )
}
