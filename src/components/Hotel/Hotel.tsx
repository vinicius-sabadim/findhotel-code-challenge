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
          <Stars rating={hotel.starRating} />
        </div>
        <div className="hotel__location">
          <i className="fas fa-location-arrow"></i>
          {formatLocation(hotel.location)} to city center
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
        <Tags tags={hotel.tags} />
      </div>
      <div className="hotel__dealsContainer">
        <BestDeal deal={bestDeal} />
        <Deals deals={hotel.deals.slice(1)} />
      </div>
    </li>
  )
}

interface TagsProps {
  tags: string[]
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="hotel__tags">
      {tags.map(tag => (
        <div key={tag} className="hotel__tag">
          {tag}
        </div>
      ))}
    </div>
  )
}

interface StarsProps {
  rating: number
}

const Stars: React.FC<StarsProps> = ({ rating }) => {
  const stars = Array(5).fill(null)
  return (
    <>
      {stars.map((_, index) => (
        <div
          key={`star-${index}`}
          className={
            index + 1 <= rating ? 'hotel__star--active' : 'hotel__star'
          }
        >
          ★
        </div>
      ))}
    </>
  )
}

interface DealsProps {
  deals: DealType[]
}

const Deals: React.FC<DealsProps> = ({ deals }) => {
  return (
    <>
      {deals.map(deal => (
        <div key={deal.partner} className="hotel__deal">
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
      ))}
    </>
  )
}

export default Hotel
