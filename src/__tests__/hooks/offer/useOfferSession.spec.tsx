import { useOfferSession } from 'src/hooks/offer/useOfferSession'
import { renderHook } from '@testing-library/react'
import { fakeData } from 'src/data/fake'

const { currentOffer } = fakeData

describe('useOfferSession hook', () => {
  it('should check if user is the owner of the offer', () => {
    const { result } = renderHook(() => useOfferSession(currentOffer))
    const { userIsTheOfferOwner } = result.current
    expect(userIsTheOfferOwner).toBe(false)
  })
})
