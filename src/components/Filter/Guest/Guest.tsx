import React from 'react'

import './Guest.css'

interface GuestProps {
  selected: number
  onChange: (value: number) => void
}

const Guest: React.FC<GuestProps> = ({ selected, onChange }) => {
  return (
    <div className="filter__listContainer">
      <p>Guest Rating </p>
      <div className="filter__listActions">
        <Action
          isActive={selected === 0}
          value="Any"
          toggleValue={() => onChange(0)}
        />
        <Action
          isActive={selected >= 6}
          value="6+"
          toggleValue={() => onChange(6)}
        />
        <Action
          isActive={selected >= 7}
          value="7+"
          toggleValue={() => onChange(7)}
        />
        <Action
          isActive={selected >= 8}
          value="8+"
          toggleValue={() => onChange(8)}
        />
        <Action
          isActive={selected >= 9}
          value="9+"
          toggleValue={() => onChange(9)}
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
