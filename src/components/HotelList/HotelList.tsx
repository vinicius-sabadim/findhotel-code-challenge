import React from 'react'

import Hotel from '../Hotel'

import { sortHotels, filterHotels } from './functions'
import { useAppState } from '../../app-context'

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

  const sortedHotels = sortHotels(hotels, sortBy)
  const filteredHotels = filterHotels(
    sortedHotels,
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    filterByStarRating
  )

  const hotelMapper = (hotels: HotelType[]): JSX.Element[] => {
    return hotels.map(hotel => <Hotel key={hotel.id} hotel={hotel} />)
  }

  if (filteredHotels.length === 0)
    return (
      <div className="hotelList__noResults">
        <p>We're very sorry. :(</p>
        <p>There are no hotels using your criteria.</p>
      </div>
    )

  return (
    <ul data-testid="hotel-list" className="hotelList__container">
      {hotelMapper(filteredHotels)}
    </ul>
  )
}

export default HotelList
