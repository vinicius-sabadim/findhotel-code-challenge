import React from 'react'

import { Deal } from '../../../types'

import './BestDeal.css'

interface BestDealProps {
  deal: Deal
}

const BestDeal: React.FC<BestDealProps> = ({ deal }) => {
  return (
    <div className="bestDeal__container">
      {deal.discount ? (
        <>
          <span className="bestDeal__value">€{deal.value}</span>
          <span className="bestDeal__finalValue">
            €<strong>{deal.value - deal.discount}</strong>
          </span>
        </>
      ) : (
        <span className="bestDeal__finalValue">€{deal.value}</span>
      )}
      {deal.hasFreeCancellation && (
        <span className="bestDeal__freeCancellation">Free cancellation</span>
      )}
      <a href={deal.url} className="bestDeal__action">
        {deal.partner} <i>→</i>
      </a>
    </div>
  )
}

export default BestDeal
