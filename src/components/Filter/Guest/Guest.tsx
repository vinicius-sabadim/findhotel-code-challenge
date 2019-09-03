import React from 'react'

import { useAppState } from '../../../app-context'

import './Guest.css'

const Guest: React.FC = () => {
  const { filterByGuestRating, updateFilterByGuestRating } = useAppState()

  return (
    <div className="filter__listContainer">
      <p>Guest Rating </p>
      <div className="filter__listActions">
        <Action
          isActive={filterByGuestRating === 0}
          value="Any"
          toggleValue={() => updateFilterByGuestRating(0)}
        />
        <Action
          isActive={filterByGuestRating <= 6}
          value="6+"
          toggleValue={() => updateFilterByGuestRating(6)}
        />
        <Action
          isActive={filterByGuestRating <= 7}
          value="7+"
          toggleValue={() => updateFilterByGuestRating(7)}
        />
        <Action
          isActive={filterByGuestRating <= 8}
          value="8+"
          toggleValue={() => updateFilterByGuestRating(8)}
        />
        <Action
          isActive={filterByGuestRating <= 9}
          value="9+"
          toggleValue={() => updateFilterByGuestRating(9)}
        />
      </div>
    </div>
  )
}

interface ActionProps {
  isActive: boolean
  value: string
  toggleValue: () => void
}

const Action: React.FC<ActionProps> = ({ isActive, value, toggleValue }) => {
  return (
    <button
      className={`guest__button ${isActive ? 'guest__button--active' : ''}`}
      onClick={toggleValue}
    >
      {value}
    </button>
  )
}

export default Guest
