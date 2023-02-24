import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Box, Card, CardActionArea, CardContent, CardMedia, SxProps, Typography } from '@mui/material'

type AdCardProps = {
  image: ImageProps
  children: string
  href?: string
  openInNewTab?: boolean
  sx?: SxProps
}

export const AdCard = (props: AdCardProps) => {
  const { image, children, href, openInNewTab, sx } = props
  const content = (
    <>
      <CardMedia>
        <Box width="100%" height="100%" minWidth={130} minHeight={{ xs: 100, lg: 220 }} position="relative">
          <Image layout="fill" objectFit="cover" alt={image.alt} draggable="false" {...image} />
        </Box>
      </CardMedia>
      <CardContent sx={{ backgroundColor: 'primary.main' }}>
        <Typography component="h2" variant="body2" color="white" fontWeight={500}>
          {children}
        </Typography>
      </CardContent>
    </>
  )

  if (!!href)
    return (
      <Card sx={{ maxWidth: { xs: 330, lg: 300 }, ...sx }}>
        <Link href={href} passHref>
          <CardActionArea
            component="a"
            {...(openInNewTab && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
            sx={{
              display: { xs: 'flex', lg: 'block' },
              alignItems: 'stretch',
              flexDirection: 'row-reverse',
              textDecoration: 'none',
            }}
          >
            {content}
          </CardActionArea>
        </Link>
      </Card>
    )

  return <Card sx={{ maxWidth: 300, ...sx }}>{content}</Card>
}
