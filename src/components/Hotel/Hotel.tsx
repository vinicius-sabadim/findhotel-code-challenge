import React from 'react'

import BestDeal from './BestDeal'

import { useAppState } from '../../app-context'
import {
  getGuestRatingColor,
  getGuestRatingText,
  formatLocation
} from './functions'

import { Deal as DealType, Hotel as HotelType } from '../../types'

import './Hotel.css'

interface HotelProps {
  hotel: HotelType
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  const { changeBookmark } = useAppState()

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

  const handleBookmark = () => {
    changeBookmark(hotel.id, !hotel.isBookmarked)
  }

  return (
    <li className="hotel__container">
      <div className="hotel__photo">
        <i
          data-testid="bookmark"
          className={`fa-heart hotel__bookmark ${
            hotel.isBookmarked ? 'fas hotel__bookmark--active' : 'far'
          }`}
          onClick={handleBookmark}
        ></i>
        {hotel.hasGreatDeal && (
          <span className="hotel__offer">Great offer</span>
        )}
        <img src={hotel.photo} alt="Detail of room" />
      </div>
      <div className="hotel__info">
        <h1>{hotel.title}</h1>
        <div className="hotel__stars">
          {starMapper([...Array(5)], hotel.starRating)}
        </div>
        <div className="hotel__location">
          <i className="fas fa-location-arrow"></i>
          {formatLocation(hotel.location)}
        </div>
        <div className="hotel__guestRating">
          <i
            className="far fa-smile"
            style={{
              color: getGuestRatingColor(parseFloat(hotel.guestRating))
            }}
          ></i>
          {getGuestRatingText(parseFloat(hotel.guestRating))}{' '}
          {hotel.guestRating}
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
      <div className="hotel__dealPriceContainer">
        {deal.discount ? (
          <>
            <span className="hotel__dealPrice">€{deal.price}</span>
            <span className="hotel__dealFinalPrice">
              €{deal.price - deal.discount}
            </span>
          </>
        ) : (
          <span className="hotel__dealFinalPrice">€{deal.price}</span>
        )}
      </div>
      <a href={deal.url}>
        View Deal<span>˃</span>
      </a>
    </div>
  )
}

export default Hotel
