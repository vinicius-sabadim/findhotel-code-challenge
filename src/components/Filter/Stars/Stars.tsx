import React from 'react'

import './Stars.css'

interface StarsProps {
  selected: Set<number>
  onChange: (value: Set<number>) => void
}

const Stars: React.FC<StarsProps> = ({ selected, onChange }) => {
  const handleClick = (value: number): void => {
    if (value === 0) return onChange(new Set())

    const newStars = selected
    if (selected.has(value)) {
      newStars.delete(value)
    } else {
      newStars.add(value)
    }
    onChange(new Set(newStars))
  }

  return (
    <div className="stars__container">
      <p>Star Rating </p>
      <div className="stars__actions">
        <Star
          isActive={selected.size === 0}
          value="Any"
          toggleValue={() => handleClick(0)}
        ></Star>
        <Star
          isActive={selected.has(2)}
          value="2"
          toggleValue={() => handleClick(2)}
        ></Star>
        <Star
          isActive={selected.has(3)}
          value="3"
          toggleValue={() => handleClick(3)}
        ></Star>
        <Star
          isActive={selected.has(4)}
          value="4"
          toggleValue={() => handleClick(4)}
        ></Star>
        <Star
          isActive={selected.has(5)}
          value="5"
          toggleValue={() => handleClick(5)}
        ></Star>
      </div>
    </div>
  )
}

interface StarProps {
  isActive: boolean
  value: string
  toggleValue: () => void
}

const Star: React.FC<StarProps> = ({ isActive, value, toggleValue }) => {
  return (
    <button
      className={`star__button ${isActive ? 'star__button--active' : ''}`}
      onClick={toggleValue}
    >
      {value}
      {value !== 'Any' && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      )}
    </button>
  )
}

export default Stars
