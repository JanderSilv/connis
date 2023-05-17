import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Badge, Box, Card, CardActionArea, CardContent, Divider, ListItem, Stack, Typography } from '@mui/material'

import { Proposal } from 'src/models/types'
import { proposalCategories } from 'src/data/proposal'
import { formatDate, formatNumber } from 'src/helpers/formatters'
import { ProposalCategory } from 'src/models/enums'

import { ProposalStatusChip } from '../../chip-status'
import { BadgeContainer, ContentContainer, Description, Header, ListItemButton } from '../styles'
import { UserAvatar } from 'src/components/shared'

export type ProposalCardProps = {
  proposal: Proposal
  layout?: 'row' | 'card'
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { proposal, layout = 'row' } = props

  const { data: session } = useSession()

  const {
    id,
    title,
    createdAt,
    updatedAt,
    views,
    status,
    category,
    description,
    unseenActivities,
    categoryOther,
    company,
  } = proposal

  const categoryData = proposalCategories[category]

  const { icon: Icon, title: categoryTitle, id: categoryId } = categoryData

  const isRowLayout = layout === 'row'
  const userParticipatesOnProposal = [company.id, proposal.offerCompany?.id].includes(session?.user.id)
  const shouldShowBadge = isRowLayout && userParticipatesOnProposal

  const badgeContent = (
    <>
      <Icon color="inherit" fontSize="large" />
      <Typography component="span" color="inherit">
        {categoryId === ProposalCategory.others ? categoryOther : categoryTitle}
      </Typography>
    </>
  )
  const content = (
    <>
      <Box>
        {shouldShowBadge && <ProposalStatusChip status={status} sx={{ mb: 1, display: { sm: 'none' } }} />}
        <Header>
          <Typography variant="h3">{title}</Typography>

          {shouldShowBadge && (
            <Box display="flex" alignItems="center" gap={1}>
              <ProposalStatusChip status={status} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
            </Box>
          )}
        </Header>

        <Description>{description}</Description>
      </Box>

      {!isRowLayout && (
        <>
          <Divider sx={{ my: 2 }} />
          <Stack mt={1} direction="row" alignItems="center" spacing={1}>
            <UserAvatar name={company.name} src={company.image} size={20} />
            <Typography variant="body2">{company.name}</Typography>
          </Stack>
        </>
      )}

      <Stack mt={1} direction="row" alignItems="center" spacing={1}>
        <Typography component="time" variant="caption">
          {!!updatedAt ? 'Atualizado' : 'Criado'} {formatDate.distanceToNow(new Date(updatedAt || createdAt))}
        </Typography>
        {userParticipatesOnProposal && (
          <>
            {!!views ? (
              <>
                <Divider orientation="vertical" flexItem />
                <Typography component="span" variant="caption">
                  {formatNumber(views)} visualizações
                </Typography>
              </>
            ) : (
              <>
                <Divider orientation="vertical" flexItem />
                <Typography component="span" variant="caption">
                  Nenhuma visualização
                </Typography>
              </>
            )}
          </>
        )}
      </Stack>
    </>
  )

  if (!isRowLayout)
    return (
      <Card>
        <CardActionArea component={Link} href={`/proposta/${id}`}>
          <BadgeContainer layout="card">
            {badgeContent}
            {userParticipatesOnProposal && (
              <ProposalStatusChip status={status} sx={{ position: 'absolute', top: 10, right: 10 }} />
            )}
          </BadgeContainer>
          <CardContent>{content}</CardContent>
        </CardActionArea>
      </Card>
    )

  return (
    <ListItem disableGutters>
      <ListItemButton component={Link} href={`/proposta/${id}`}>
        <ContentContainer>{content}</ContentContainer>

        <Badge badgeContent={unseenActivities} max={9} color="error">
          <BadgeContainer>{badgeContent}</BadgeContainer>
        </Badge>
      </ListItemButton>
    </ListItem>
  )
}
