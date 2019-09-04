import React from 'react'

import './Mobile.css'

interface MobileAreaProps {
  showFilters: () => void
  showSort: () => void
}

const MobileArea: React.FC<MobileAreaProps> = ({ showFilters, showSort }) => {
  return (
    <div className="mobile__container">
      <button className="mobile__button" onClick={showFilters}>
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
      <button className="mobile__button" onClick={showSort}>
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

export default MobileArea
