import React from 'react'

import Hotel from '../Hotel'

import { useHotelsState } from '../../hotels-context'

import { Hotel as HotelType } from '../../types'

import './HotelList.css'

const HotelList: React.FC = () => {
  const { hotels } = useHotelsState()

  const hotelMapper = (hotels: HotelType[]): JSX.Element[] => {
    return hotels.map(hotel => <Hotel key={hotel.id} hotel={hotel} />)
  }

  return <ul className="hotelList__container">{hotelMapper(hotels)}</ul>
}

export default HotelList
