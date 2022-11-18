import { BoxProps, List, ListProps, Typography } from '@mui/material'
import { Link } from 'src/components/link'

import { ProposalCard, ProposalCardProps } from 'src/components/proposal'
import { EmptyTypography, Header, Wrapper } from './styles'

type RecentActivitiesProps = {
  title: string
  activities: ProposalCardProps[]
  emptyText?: string
  seeMoreLink: string
  listProps?: ListProps
  shouldHideMoreButton?: boolean
} & BoxProps

export const RecentActivities = (props: RecentActivitiesProps) => {
  const { title, activities, emptyText, seeMoreLink, listProps, shouldHideMoreButton = false, ...rest } = props

  const hasActivities = activities.length > 0

  const seeMoreLinkComponent = (isMobile = false) =>
    hasActivities && (
      <Link
        href={seeMoreLink}
        muiLinkProps={{
          sx: isMobile
            ? { textAlign: 'center', display: { xs: 'block', sm: 'none' } }
            : { display: { xs: 'none', sm: 'inline' } },
        }}
      >
        Ver todas
      </Link>
    )

  return (
    <Wrapper {...rest}>
      <Header>
        <Typography variant="h2" color="primary">
          {title}
        </Typography>
        {seeMoreLinkComponent()}
      </Header>

      {hasActivities ? (
        <List {...listProps}>
          {activities.map(activity => (
            <ProposalCard key={activity.title} {...activity} shouldHideMoreButton={shouldHideMoreButton} />
          ))}
        </List>
      ) : (
        <EmptyTypography>{emptyText || 'Nenhuma atividade recente'}</EmptyTypography>
      )}

      {seeMoreLinkComponent(true)}
    </Wrapper>
  )
}
