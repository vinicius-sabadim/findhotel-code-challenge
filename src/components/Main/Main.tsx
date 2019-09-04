import React from 'react'

import DesktopArea from './Desktop'
import HotelList from '../HotelList'
import Loading from '../Loading'
import MobileArea from './Mobile'

import { useAppState } from '../../app-context'

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

export default Main
