import React, { useState } from 'react'

import Filter from '../Filter'
import Header from '../Header'
import Main from '../Main'
import Sort from '../Sort'

import { AppProvider } from '../../app-context'

import './App.css'

const App: React.FC = () => {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false)
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false)

  return (
    <AppProvider>
      <Header>
        <div className="app__logo">
          <img
            src="data:image/png;base64,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"
            alt="FindHotel logo"
          />
        </div>
      </Header>
      <div className="app__container">
        <Main
          showFilters={() => setIsFilterOpened(true)}
          showSort={() => setIsSortOpened(true)}
        />
      </div>
      <Filter
        isOpen={isFilterOpened}
        hideFilters={() => setIsFilterOpened(false)}
      />
      <Sort isOpen={isSortOpened} hideSort={() => setIsSortOpened(false)} />
    </AppProvider>
  )
}

export default App
