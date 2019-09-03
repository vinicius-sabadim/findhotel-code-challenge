import React from 'react'

import Header from '../Header'

import { useAppState } from '../../app-context'

import './Sort.css'

interface SortProps {
  isOpen: boolean
  hideSort: () => void
}

const Sort: React.FC<SortProps> = ({ isOpen, hideSort }) => {
  const { sortBy, updateSortBy } = useAppState()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSortBy(e.target.value)
    hideSort()
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
            onClick={hideSort}
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
          Sort by
        </Header>
        <div className="sort__actions">
          <label
            htmlFor="best-match"
            className={`
              sort__label
              ${sortBy === 'best' ? 'sort__label--active' : ''}`}
          >
            <input
              type="radio"
              name="sort"
              value="best"
              id="best-match"
              checked={sortBy === 'best'}
              onChange={handleChange}
            />
            Best match
          </label>
          <label
            htmlFor="lowest-price"
            className={`
              sort__label
              ${sortBy === 'lowest' ? 'sort__label--active' : ''}`}
          >
            <input
              type="radio"
              name="sort"
              value="lowest"
              id="lowest-price"
              checked={sortBy === 'lowest'}
              onChange={handleChange}
            />
            Lowest price
          </label>
        </div>
      </div>
    </>
  )
}

export default Sort
