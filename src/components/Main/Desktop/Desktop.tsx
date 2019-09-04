import React from 'react'
import Slider from 'react-rangeslider'

import Distribution from '../Distribution'

import { formatLocation } from '../../Hotel/functions'
import { getHotelsUsingCriteria } from '../../../functions'
import { useAppState } from '../../../app-context'

import { Hotel } from '../../../types'

import './Desktop.css'

const DesktopArea: React.FC = () => {
  const {
    hotels,
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    filterByStarRating,
    sortBy,
    updateFilterByDistance,
    updateFilterByGuestRating,
    updateFilterByMaxPrice,
    updateSortBy
  } = useAppState()

  const hotelsWithCriteria = getHotelsUsingCriteria(
    hotels,
    sortBy,
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    filterByStarRating
  )

  return (
    <div className="desktop__container">
      <div className="desktop__sliderArea">
        <div className="desktop__slider desktop__slider--price">
          <p>
            <i className="fas fa-euro-sign"></i> Max price
          </p>
          <span>€{filterByMaxPrice}</span>
          <Distribution criteria="price" />
          <Slider
            min={1}
            max={1000}
            tooltip={false}
            value={filterByMaxPrice}
            onChange={updateFilterByMaxPrice}
          />
        </div>
        <div className="desktop__slider desktop__slider--guest">
          <p>
            <i className="far fa-smile"></i> Min rating
          </p>
          <span>{filterByGuestRating}</span>
          <Distribution criteria="guest" />
          <Slider
            min={0}
            max={10}
            tooltip={false}
            value={filterByGuestRating}
            onChange={updateFilterByGuestRating}
          />
        </div>
        <div className="desktop__slider desktop__slider--location">
          <p>
            <i className="fas fa-location-arrow"></i> Distance from city center
          </p>
          <span>{formatLocation(filterByDistance)}</span>
          <Distribution criteria="distance" />
          <Slider
            min={20}
            max={50000}
            step={100}
            tooltip={false}
            value={filterByDistance}
            onChange={updateFilterByDistance}
          />
        </div>
      </div>

      {hotelsWithCriteria.length > 0 && (
        <div className="desktop__sortArea">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => updateSortBy(e.target.value)}
          >
            <option value="best">Best match</option>
            <option value="lowest">Lowest price</option>
          </select>
          <HotelsInfo hotelsWithCriteria={hotelsWithCriteria} />
        </div>
      )}
    </div>
  )
}

interface HotelsInfoProps {
  hotelsWithCriteria: Hotel[]
}

const HotelsInfo: React.FC<HotelsInfoProps> = ({ hotelsWithCriteria }) => {
  const hotelsAmount = hotelsWithCriteria.length
  const hotelsWithGreatDeals = hotelsWithCriteria.filter(
    hotel => hotel.hasGreatDeal
  ).length

  return (
    <div className="desktop__hotelInfo">
      {hotelsAmount} {hotelsAmount === 1 ? 'hotel' : 'hotels'}
      {hotelsWithGreatDeals > 0 && (
        <span>
          ,{' '}
          <span className="desktop__hotelInfoDeals">
            {hotelsWithGreatDeals} with great deals
          </span>
        </span>
      )}
    </div>
  )
}

export default DesktopArea
