import React from 'react'

import * as api from './api'

import { Hotel as HotelType } from './types'

type State = {
  isLoading: boolean
  hotels: HotelType[]
  changeBookmark: (id: number, value: boolean) => Promise<void>
}
type HotelsProviderProps = { children: React.ReactNode }

const HotelsStateContext = React.createContext<State | undefined>(undefined)

function HotelsProvider({ children }: HotelsProviderProps) {
  const [state, setState] = React.useState<State>({
    isLoading: true,
    hotels: [],
    changeBookmark
  })

  const fetchHotels = async () => {
    try {
      const hotels = await api.getHotels()
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

  async function changeBookmark(id: number, value: boolean): Promise<void> {
    try {
      const hotels = await api.changeBookmark(id, value)
      setState(prevState => ({
        ...prevState,
        hotels
      }))
    } catch {}
  }

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
