import React from 'react'
import Slider from 'react-rangeslider'

import HotelList from '../HotelList'
import Loading from '../Loading'

import { useAppState } from '../../app-context'
import { formatLocation } from '../Hotel/functions'

import './Main.css'

interface MainProps {
  showFilters: () => void
  showSort: () => void
}

const Main: React.FC<MainProps> = ({ showFilters, showSort }) => {
  const { isLoading } = useAppState()

  if (isLoading)
    return (
      <div className="main__container main__loading">
        <Loading />
      </div>
    )

  return (
    <div className="main__container">
      <MobileArea showFilters={showFilters} showSort={showSort} />
      <DesktopArea />
      <HotelList />
    </div>
  )
}

interface MobileAreaProps {
  showFilters: () => void
  showSort: () => void
}

const MobileArea: React.FC<MobileAreaProps> = ({ showFilters, showSort }) => {
  return (
    <div className="main__buttonArea">
      <button className="main__button" onClick={showFilters}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          style={{ marginRight: '5px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
        </svg>
        Filter by
      </button>
      <button className="main__button" onClick={showSort}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          style={{ marginRight: '5px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
        </svg>
        Sort by
      </button>
    </div>
  )
}

const DesktopArea: React.FC = () => {
  const {
    filterByDistance,
    filterByGuestRating,
    filterByMaxPrice,
    updateFilterByDistance,
    updateFilterByGuestRating,
    updateFilterByMaxPrice
  } = useAppState()
  return (
    <div className="main__sliderArea">
      <div className="main__slider main__slider--price">
        <p>
          <i className="fas fa-euro-sign"></i> Max price
        </p>
        <span>€{filterByMaxPrice}</span>
        <Slider
          min={1}
          max={1000}
          tooltip={false}
          value={filterByMaxPrice}
          onChange={updateFilterByMaxPrice}
        />
      </div>
      <div className="main__slider main__slider--guest">
        <p>
          <i className="far fa-smile"></i> Min rating
        </p>
        <span>{filterByGuestRating}</span>
        <Slider
          min={0}
          max={10}
          tooltip={false}
          value={filterByGuestRating}
          onChange={updateFilterByGuestRating}
        />
      </div>
      <div className="main__slider main__slider--location">
        <p>
          <i className="fas fa-location-arrow"></i> Distance from city center
        </p>
        <span>{formatLocation(filterByDistance)}</span>
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
  )
}

export default Main
