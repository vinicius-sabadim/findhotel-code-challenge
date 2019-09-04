import React from 'react'

import Hotel from '../Hotel'

import { useAppState } from '../../app-context'
import { getHotelsUsingCriteria } from '../../functions'

import { Hotel as HotelType } from '../../types'

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

  const hotelMapper = (hotels: HotelType[]): JSX.Element[] => {
    return hotels.map(hotel => <Hotel key={hotel.id} hotel={hotel} />)
  }

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
      {hotelMapper(hotelsWithCriteria)}
    </ul>
  )
}

export default HotelList
