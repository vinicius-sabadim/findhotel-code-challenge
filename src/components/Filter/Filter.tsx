import React from 'react'

import Header from '../Header'
import Guest from './Guest'
import Stars from './Stars'

import { useAppState } from '../../app-context'

import './Filter.css'

interface FilterProps {
  isOpen: boolean
  hideFilters: () => void
}

const Filter: React.FC<FilterProps> = ({ isOpen, hideFilters }) => {
  const { updateFilterByGuestRating, updateFilterByStarRating } = useAppState()

  const reset = () => {
    updateFilterByGuestRating(0)
    updateFilterByStarRating(new Set())
  }

  return (
    <>
      <div
        className={`filter__container ${
          isOpen ? 'filter__opened' : 'filter__closed'
        }`}
      >
        <Header>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: '0 16px' }}
            onClick={() => {
              reset()
              hideFilters()
            }}
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
          Filter by
        </Header>
        <Guest />
        <Stars />
        <div className="filter__buttons">
          <button className="filter__button" onClick={reset}>
            Reset
          </button>
          <button
            className="filter__button filter__button--main"
            onClick={hideFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

export default Filter
