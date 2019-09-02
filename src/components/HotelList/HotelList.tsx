import React from 'react'

import Hotel from '../Hotel'

import { Hotel as HotelType } from '../../types'

import './HotelList.css'

interface HotelListProps {
  hotels: HotelType[]
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const hotelMapper = (hotels: HotelType[]): JSX.Element[] => {
    return hotels.map(hotel => <Hotel key={hotel.id} hotel={hotel} />)
  }

  return <ul className="hotelList__container">{hotelMapper(hotels)}</ul>
}

export default HotelList
