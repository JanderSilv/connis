import { useState } from 'react'
import Image from 'next/image'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { ICTLab, Image as ImageType } from 'src/models/types'

import { parseHTMLToReact } from 'src/helpers/parsers'

import { CloseIcon, ExpandLessIcon, ExpandMoreIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

type LabsSectionProps = {
  labs: ICTLab[]
}

export const LabsSection = (props: LabsSectionProps) => {
  const { labs } = props

  const [selectedLab, setSelectedLab] = useState<ICTLab | null>(null)
  const [showAllLabs, setShowAllLabs] = useState(labs.length <= 8)

  return (
    <Section mt={3}>
      <Typography component="h2" variant="h3">
        Nossos Laboratórios
      </Typography>

      <Collapse in={showAllLabs} collapsedSize={150}>
        <Box
          my={2}
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(170px, auto))"
          gridTemplateRows="120px"
          gap={2}
        >
          {labs.map(lab => {
            const firstImage = lab.images?.[0]
            return (
              <Card key={lab.id} sx={{ minHeight: 120 }}>
                <CardActionArea onClick={() => setSelectedLab(lab)} sx={{ height: '100%', position: 'reative' }}>
                  {!!firstImage && (
                    <Box width="100%" height="100%" position="relative">
                      <Image
                        src={firstImage.src}
                        alt={firstImage.alt || 'Imagem do laborátorio'}
                        draggable="false"
                        aria-hidden="true"
                        style={{ objectPosition: 'cover' }}
                        sizes="100vw"
                        fill
                      />
                    </Box>
                  )}
                  <CardContent
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(1.1px)',
                      backgroundColor: '#00000054',
                    }}
                  >
                    <Typography
                      component="span"
                      color="white"
                      textAlign="center"
                      lineHeight="20px"
                      sx={{
                        textShadow: '1px 1px 5px black',
                      }}
                    >
                      {lab.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </Collapse>

      {labs.length >= 8 && (
        <Button
          endIcon={showAllLabs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setShowAllLabs(prevValue => !prevValue)}
        >
          {showAllLabs ? 'Ver menos' : 'Ver todos'}
        </Button>
      )}

      <LabDialog open={!!selectedLab} onClose={() => setSelectedLab(null)} lab={selectedLab} />
    </Section>
  )
}

type LabDialogProps = {
  open: boolean
  onClose: () => void
  lab: ICTLab | null
}

export const LabDialog = (props: LabDialogProps) => {
  const { open, onClose, lab } = props

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)

  if (!lab) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={isMobile}>
      <DialogTitle>{lab.title}</DialogTitle>
      <DialogContent>
        {parseHTMLToReact(lab.description)}
        <Box
          my={2}
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(170px, 380px))"
          gridTemplateRows={250}
          gap={2}
        >
          {lab.images?.map(image => (
            <Box
              key={image.id}
              component={Button}
              onClick={() => setSelectedImage(image)}
              width="100%"
              height="100%"
              position="relative"
            >
              <Image
                src={image.src}
                alt={image.alt || 'Imagem do laborátorio'}
                style={{ objectPosition: 'cover' }}
                sizes="100vw"
                fill
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>

      {!!selectedImage && (
        <Dialog onClose={() => setSelectedImage(null)} maxWidth="lg" open>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
            <CloseIcon sx={{ color: 'primary.contrastText' }} />
          </IconButton>
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt || 'Imagem do laborátorio'}
            width={1920}
            height={1080}
            style={{ objectPosition: 'cover' }}
          />
        </Dialog>
      )}
    </Dialog>
  )
}
