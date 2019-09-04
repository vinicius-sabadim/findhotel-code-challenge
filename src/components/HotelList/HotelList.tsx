import React from 'react'

import Hotel from '../Hotel'

import { useAppState } from '../../app-context'
import { getHotelsUsingCriteria } from '../../functions'

import './HotelList.css'

const HotelList: React.FC = () => {
  const {
    hotels,
    sortBy,
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    filterByStarRating
  } = useAppState()

  const hotelsWithCriteria = getHotelsUsingCriteria(
    hotels,
    sortBy,
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    filterByStarRating
  )

  if (hotelsWithCriteria.length === 0)
    return (
      <div className="hotelList__noResults">
        <p>We're very sorry. :(</p>
        <p>There are no hotels using your criteria.</p>
      </div>
    )

  return (
    <ul data-testid="hotel-list" className="hotelList__container">
      {hotelsWithCriteria.map(hotel => (
        <Hotel key={hotel.id} hotel={hotel} />
      ))}
    </ul>
  )
}

export default HotelList
