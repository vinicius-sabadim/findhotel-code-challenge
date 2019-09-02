import React from 'react'

import { Hotel as HotelType } from '../../types'

import './Hotel.css'

interface HotelProps {
  hotel: HotelType
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  const starMapper = (stars: number[], value: number): JSX.Element[] => {
    return stars.map((_, index) => (
      <div
        key={`star-${index}`}
        className={index + 1 <= value ? 'hotel__star--active' : 'hotel__star'}
      >
        ★
      </div>
    ))
  }

  const tagMapper = (tags: string[]): JSX.Element[] => {
    return tags.map(tag => <Tag key={tag} tag={tag} />)
  }

  return (
    <li className="hotel__container">
      <img src={hotel.photo} alt="Detail of room" />
      <div className="hotel__info">
        <h1>{hotel.title}</h1>
        <div className="hotel__stars">
          {starMapper([...Array(5)], hotel.starRating)}
        </div>
        {hotel.location}
        {hotel.guestRating}
        {tagMapper(hotel.tags)}
      </div>
    </li>
  )
}

interface TagProps {
  tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <div>{tag}</div>
}

export default Hotel
