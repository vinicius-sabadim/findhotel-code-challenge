import React from 'react'

import * as api from './api'

import { Hotel as HotelType } from './types'

type State = {
  isLoading: boolean
  hotels: HotelType[]
  sortBy: string
  changeBookmark: (id: string, value: boolean) => Promise<void>
  updateSortBy: (value: string) => void
}
type HotelsProviderProps = { children: React.ReactNode }

const HotelsStateContext = React.createContext<State | undefined>(undefined)

function HotelsProvider({ children }: HotelsProviderProps) {
  const [state, setState] = React.useState<State>({
    isLoading: true,
    hotels: [],
    sortBy: 'best',
    changeBookmark,
    updateSortBy
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

  async function changeBookmark(id: string, value: boolean): Promise<void> {
    try {
      const hotels = await api.changeBookmark(id, value)
      setState(prevState => ({
        ...prevState,
        hotels
      }))
    } catch {}
  }

  function updateSortBy(value: string) {
    setState(prevState => ({
      ...prevState,
      sortBy: value
    }))
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
