import { useState } from 'react'
import { Step, StepButton, StepContent, Stepper, Typography } from '@mui/material'

import { offerCategories } from 'src/data/offer'
import { formatDate, formatString } from 'src/helpers/formatters'

import { OfferCategory } from 'src/models/enums'
import { Offer, Proposal, User } from 'src/models/types'

import { OfferDataSectionOne, OfferDataSectionTwo } from 'src/components/offer'
import { ProposalSections } from 'src/components/proposal'

import { DescriptionIcon } from 'src/assets/icons'
import { OfferStepIconRoot } from 'src/styles/offer'

type OfferHistoryProps = {
  proposal: Proposal
  offers: Offer[]
  user: User
}

export const OfferHistory = ({ proposal, offers, user }: OfferHistoryProps) => {
  const [activatedOfferSteps, setActivatedOfferSteps] = useState(() => ({
    ...offers.reduce((acc, offer) => ({ ...acc, [offer.id]: true }), {} as Record<string, boolean>),
  }))
  const [isProposalActive, setIsProposalActive] = useState(true)

  const checkIsCounterProposal = (offer: Offer, index: number) => {
    const { suggestion } = offer

    if (!suggestion) return false

    if (index === 0)
      return (
        proposal.budget !== suggestion.budget ||
        proposal.trl !== suggestion.trl ||
        proposal.goalTrl !== suggestion.goalTrl
      )

    const previousOfferSuggestion = offers[index - 1].suggestion

    return (
      previousOfferSuggestion?.budget !== suggestion.budget ||
      previousOfferSuggestion?.trl !== suggestion.trl ||
      previousOfferSuggestion?.goalTrl !== suggestion.goalTrl
    )
  }

  return (
    <Stepper orientation="vertical" nonLinear>
      {offers.map((offer, index) => {
        const offerCategory = checkIsCounterProposal(offer, index)
          ? OfferCategory.counterProposal
          : OfferCategory.default
        return (
          <Step key={offer.id} active={activatedOfferSteps[offer.id]} completed={true}>
            <StepButton
              icon={
                <OfferStepIcon active={activatedOfferSteps[offer.id]} completed={true} offerCategory={offerCategory} />
              }
              onClick={() => setActivatedOfferSteps(prev => ({ ...prev, [offer.id]: !prev[offer.id] }))}
              sx={{ '& .MuiStepLabel-label:is(.Mui-active, .Mui-completed)': { fontWeight: '400' } }}
            >
              <strong>
                {user.companyId === offer.company.id ? 'Você' : formatString.capitalizeFirstLetters(offer.company.name)}
              </strong>{' '}
              fez uma {offerCategories[offerCategory].text} {formatDate.distanceToNow(new Date(offer.createdAt))}
            </StepButton>
            <StepContent>
              <OfferDataSectionOne {...offer} hideStatus={index !== 0} />
              {offerCategory === OfferCategory.counterProposal && (
                <OfferDataSectionTwo proposal={proposal} currentOffer={offer} offers={offers} />
              )}
            </StepContent>
          </Step>
        )
      })}
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
