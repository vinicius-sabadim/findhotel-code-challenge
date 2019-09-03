import React from 'react'

import BestDeal from './BestDeal'

import { getGuestRatingColor, getGuestRatingText } from './functions'

import { Deal as DealType, Hotel as HotelType } from '../../types'

import './Hotel.css'

interface HotelProps {
  hotel: HotelType
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  const bestDeal = hotel.deals[0]

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

  const dealsMapper = (deals: DealType[]): JSX.Element[] => {
    return deals.map(deal => <Deal key={deal.partner} deal={deal} />)
  }

  return (
    <li className="hotel__container">
      <img src={hotel.photo} alt="Detail of room" />
      <div className="hotel__info">
        <h1>{hotel.title}</h1>
        <div className="hotel__stars">
          {starMapper([...Array(5)], hotel.starRating)}
        </div>
        <div className="hotel__location">
          <i className="fas fa-location-arrow"></i>
          {hotel.location}
        </div>
        <div className="hotel__guestRating">
          <i
            className="far fa-smile"
            style={{ color: getGuestRatingColor(hotel.guestRating) }}
          ></i>
          {getGuestRatingText(hotel.guestRating)} {hotel.guestRating}
        </div>
        <div className="hotel__tags">{tagMapper(hotel.tags)}</div>
      </div>
      <div className="hotel__dealsContainer">
        <BestDeal deal={bestDeal} />
        {dealsMapper(hotel.deals.slice(1))}
      </div>
    </li>
  )
}

interface TagProps {
  tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <div className="hotel__tag">{tag}</div>
}

interface DealProps {
  deal: DealType
}

const Deal: React.FC<DealProps> = ({ deal }) => {
  return (
    <div className="hotel__deal">
      {deal.partner}
      <div className="hotel__dealValueContainer">
        {deal.discount ? (
          <>
            <span className="hotel__dealValue">€{deal.value}</span>
            <span className="hotel__dealFinalValue">
              €{deal.value - deal.discount}
            </span>
          </>
        ) : (
          <span className="hotel__dealFinalValue">€{deal.value}</span>
        )}
      </div>
      <a href={deal.url}>
        View Deal<span>˃</span>
      </a>
    </div>
  )
}

export default Hotel
