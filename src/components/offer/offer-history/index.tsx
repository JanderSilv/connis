import { useState } from 'react'
import { Session } from 'next-auth'
import { Step, StepButton, StepContent, Stepper, Typography } from '@mui/material'

import { offerCategories } from 'src/data/offer'
import { formatDate } from 'src/helpers/formatters'

import { OfferCategory } from 'src/models/enums'
import { Offer, Proposal } from 'src/models/types'

import { OfferDataSectionOne, OfferDataSectionTwo } from 'src/components/offer'
import { ProposalSections } from 'src/components/proposal'

import { DescriptionIcon } from 'src/assets/icons'
import { OfferStepIconRoot } from 'src/styles/offer'

type OfferHistoryProps = {
  proposal: Proposal
  offers: Offer[]
  session: Session
}

export const OfferHistory = ({ proposal, offers, session }: OfferHistoryProps) => {
  const [activatedOfferSteps, setActivatedOfferSteps] = useState(() => ({
    ...offers.reduce((acc, offer) => ({ ...acc, [offer.id]: true }), {} as Record<string, boolean>),
  }))
  const [isProposalActive, setIsProposalActive] = useState(true)

  return (
    <Stepper orientation="vertical" nonLinear>
      {[...offers].reverse().map(offer => (
        <Step key={offer.id} active={activatedOfferSteps[offer.id]} completed={true}>
          <StepButton
            icon={
              <OfferStepIcon active={activatedOfferSteps[offer.id]} completed={true} offerCategory={offer.category} />
            }
            onClick={() => setActivatedOfferSteps(prev => ({ ...prev, [offer.id]: !prev[offer.id] }))}
            sx={{ '& .MuiStepLabel-label:is(.Mui-active, .Mui-completed)': { fontWeight: '400' } }}
          >
            <strong>{session?.user.id === offer.company.id ? 'Você' : offer.company.name}</strong> fez uma{' '}
            {offerCategories[offer.category].text} {formatDate.distanceToNow(new Date(offer.createdAt))}
          </StepButton>
          <StepContent>
            <OfferDataSectionOne {...offer} />
            {offer.category === OfferCategory.counterProposal && (
              <OfferDataSectionTwo proposal={proposal} currentOffer={offer} offers={offers} />
            )}
          </StepContent>
        </Step>
      ))}
      <Step active={isProposalActive} completed={true}>
        <StepButton
          icon={
            <OfferStepIconRoot ownerState={{ completed: true, active: isProposalActive }}>
              <DescriptionIcon fontSize="small" htmlColor="white" />
            </OfferStepIconRoot>
          }
          onClick={() => setIsProposalActive(prev => !prev)}
          sx={{ '& .MuiStepLabel-label': { fontWeight: '400' } }}
        >
          Proposta original
        </StepButton>
        <StepContent>
          <ProposalSections proposal={proposal} />
        </StepContent>
      </Step>
    </Stepper>
  )
}

type OfferStepIconProps = {
  offerCategory: OfferCategory
  active: boolean
  completed: boolean
}

const OfferStepIcon = (props: OfferStepIconProps) => {
  const { offerCategory, active, completed } = props

  const Icon = offerCategories[offerCategory].icon

  return (
    <OfferStepIconRoot ownerState={{ completed, active }}>
      <Icon fontSize="small" htmlColor="white" />
    </OfferStepIconRoot>
  )
}
