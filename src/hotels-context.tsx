import React from 'react'

import { getHotels } from './api'

import { Hotel as HotelType } from './types'

type State = {
  isLoading: boolean
  hotels: HotelType[]
}
type HotelsProviderProps = { children: React.ReactNode }

const HotelsStateContext = React.createContext<State | undefined>(undefined)

function HotelsProvider({ children }: HotelsProviderProps) {
  const [state, setState] = React.useState<State>({
    isLoading: true,
    hotels: []
  })

  const fetchHotels = async () => {
    try {
      const hotels = await getHotels()
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        hotels
      }))
    } catch {
      setState(prevState => ({
        ...prevState,
        isLoading: false
      }))
    }
  }

  React.useEffect(() => {
    fetchHotels()
  }, [])

  return (
    <HotelsStateContext.Provider value={state}>
      {children}
    </HotelsStateContext.Provider>
  )
}

function useHotelsState() {
  const context = React.useContext(HotelsStateContext)
  if (context === undefined) {
    throw new Error('useHotelsState must be used within a HotelsProvider')
  }
  return context
}

export { HotelsProvider, useHotelsState }
