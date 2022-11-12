import Link from 'next/link'
import { Badge, Box, Divider, IconButton, ListItem, Typography } from '@mui/material'

import { proposalCategories } from 'src/data/proposal'
import { ProposalCategory, ProposalStatus } from 'src/models/enums'

import { ProposalStatusChip } from '../proposal-chip-status'
import { MoreVertIcon } from 'src/assets/icons'
import { CategoryContainer, ContentContainer, Header, ListItemButton } from './styles'

export type ProposalCardProps = {
  id: number
  title: string
  description: string
  date: string
  views?: number
  status: ProposalStatus
  category: ProposalCategory
  otherCategory?: string
  recentActivities: number
  shouldHideMoreButton?: boolean
}

export const ProposalCard = (props: ProposalCardProps) => {
  const {
    id,
    title,
    description,
    date,
    views,
    status,
    category,
    otherCategory,
    recentActivities,
    shouldHideMoreButton = false,
  } = props

  const categoryData = proposalCategories[category]

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

                  {!shouldHideMoreButton && (
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>
              </Header>

              <Typography variant="body1">{description}</Typography>
            </Box>

            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography component="time" variant="caption">
                {date}
              </Typography>
              {views && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Typography component="span" variant="caption">
                    {views} visualizações
                  </Typography>
                </>
              )}
            </Box>
          </ContentContainer>

          <Badge badgeContent={recentActivities} max={9} color="error">
            <CategoryContainer>
              <Icon color="inherit" fontSize="large" />
              <Typography component="span" color="inherit">
                {categoryId === ProposalCategory.others ? otherCategory : categoryTitle}
              </Typography>
            </CategoryContainer>
          </Badge>
        </ListItemButton>
      </Link>
    </ListItem>
  )
}
