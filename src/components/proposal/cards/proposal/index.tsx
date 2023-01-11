import Link from 'next/link'
import { Badge, Box, Divider, ListItem, Typography } from '@mui/material'

import { Proposal } from 'src/models/types'
import { proposalCategories } from 'src/data/proposal'
import { formatDate, formatNumber } from 'src/helpers/formatters'
import { ProposalCategory } from 'src/models/enums'

import { ProposalStatusChip } from '../../chip-status'
import { BadgeContainer, ContentContainer, Description, Header, ListItemButton } from '../styles'

export type ProposalCardProps = Proposal

export const ProposalCard = (props: ProposalCardProps) => {
  const {
    id,
    title,
    createdAt,
    updatedAt,
    views,
    status,
    proposalCategory,
    proposalDescription,
    unseenActivities,
    proposalCategoryOther,
  } = props

  const categoryData = proposalCategories[proposalCategory]

  const { icon: Icon, title: categoryTitle, id: categoryId } = categoryData

  return (
    <ListItem disableGutters>
      <Link href={`/proposta/${id}`} passHref>
        <ListItemButton LinkComponent="a">
          <ContentContainer>
            <Box>
              <ProposalStatusChip status={status} sx={{ mb: 1, display: { xs: 'inline-flex', sm: 'none' } }} />
              <Header>
                <Typography variant="h3">{title}</Typography>

                <Box display="flex" alignItems="center" gap={1}>
                  <ProposalStatusChip status={status} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
                </Box>
              </Header>

              <Description>{proposalDescription}</Description>
            </Box>

            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography component="time" variant="caption">
                {!!updatedAt ? 'Atualizado' : 'Criado'} {formatDate.distanceToNow(new Date(updatedAt || createdAt))}
              </Typography>
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
            </Box>
          </ContentContainer>

          <Badge badgeContent={unseenActivities} max={9} color="error">
            <BadgeContainer>
              <Icon color="inherit" fontSize="large" />
              <Typography component="span" color="inherit">
                {categoryId === ProposalCategory.others ? proposalCategoryOther : categoryTitle}
              </Typography>
            </BadgeContainer>
          </Badge>
        </ListItemButton>
      </Link>
    </ListItem>
  )
}
