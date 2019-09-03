import React from 'react'

import * as api from './api'

import { Hotel as HotelType } from './types'

type State = {
  isLoading: boolean
  hotels: HotelType[]
  filterByGuestRating: number
  filterByStarRating: Set<number>
  sortBy: string
  changeBookmark: (id: string, value: boolean) => Promise<void>
  updateFilterByGuestRating: (value: number) => void
  updateFilterByStarRating: (value: Set<number>) => void
  updateSortBy: (value: string) => void
}
type AppProviderProps = { children: React.ReactNode }

const AppStateContext = React.createContext<State | undefined>(undefined)

function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = React.useState<State>({
    isLoading: true,
    hotels: [],
    filterByGuestRating: 0,
    filterByStarRating: new Set(),
    sortBy: 'best',
    changeBookmark,
    updateFilterByGuestRating,
    updateFilterByStarRating,
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

  function updateFilterByGuestRating(value: number) {
    setState(prevState => ({
      ...prevState,
      filterByGuestRating: value
    }))
  }

  function updateFilterByStarRating(value: Set<number>) {
    setState(prevState => ({
      ...prevState,
      filterByStarRating: value
    }))
  }

  function updateSortBy(value: string) {
    setState(prevState => ({
      ...prevState,
      sortBy: value
    }))
  }

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }
  return context
}

export { AppProvider, useAppState }
