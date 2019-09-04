import React from 'react'

import { useAppState } from '../../../app-context'
import { getDistribution, getHeight } from './functions'

import './Distribution.css'

interface DistributionProps {
  criteria: string
}

const Distribution: React.FC<DistributionProps> = ({ criteria }) => {
  const { hotels } = useAppState()
  const distribution = getDistribution(hotels, criteria)
  console.log(distribution)

  return (
    <div className="distribution__container">
      {distribution.map<JSX.Element>((item, index) => (
        <div
          key={`distribution-${index}`}
          className="distribution__item"
          style={{ height: getHeight(hotels.length, item) }}
        ></div>
      ))}
    </div>
  )
}

export default Distribution
