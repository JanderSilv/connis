import Link from 'next/link'
import { Badge, Box, CardActionArea, CardContent, ListItem, Stack, Typography } from '@mui/material'

import { proposalTypeOptions } from 'src/data/proposal'
import { formatDate } from 'src/helpers/formatters'
import { Offer } from 'src/models/types'

import { UserAvatar } from 'src/components/shared'
import { OfferStatusChip } from '../../chip-status'
import { BadgeContainer, Card, ContentContainer, Description, Header, ListItemButton } from '../styles'

export type OfferCardProps = {
  offer: Offer
  href?: string
  unseenActivities: number
  layout?: 'row' | 'card'
}

export const OfferCard = (props: OfferCardProps) => {
  const { offer, href, unseenActivities, layout = 'row' } = props
  const { createdAt, updatedAt, message, company, status, type, proposal } = offer

  const { icon: Icon, title: proposalTitle } = proposalTypeOptions[type]

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
      {isRowLayout && <OfferStatusChip status={status} sx={{ mb: 1, display: { sm: 'none' } }} />}
      <Header mb={1}>
        <Stack direction="row" alignItems="center" gap={2}>
          <UserAvatar name={company.name} src={company.image} size={25} />
          <Typography component="h3" variant="h5">
            {company.name}
          </Typography>
        </Stack>
        {isRowLayout && <OfferStatusChip status={status} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
      </Header>
      <Typography variant="h3">{proposal?.title}</Typography>

      <Description>{message}</Description>

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
        <CardActionArea component={Link} href={`/proposta/${proposal?.id}`}>
          <BadgeContainer layout="card">
            {badgeContent}
            <OfferStatusChip status={status} sx={{ position: 'absolute', top: 10, right: 10 }} />
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
