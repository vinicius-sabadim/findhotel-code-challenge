import { Hotel } from './types'
import { buildHotel } from './functions'

const HOW_MANY_HOTELS = 25

const hotels = Array(HOW_MANY_HOTELS)
  .fill(null)
  .map(buildHotel)

const getHotels = (): Promise<Hotel[]> => {
  // Simulating the delay of an api call
  return new Promise(resolve => setTimeout(() => resolve(hotels), 1000))
}

const changeBookmark = (id: string, value: boolean): Promise<Hotel[]> => {
  return new Promise(resolve => {
    const updatedHotels = hotels.map(hotel => {
      if (hotel.id === id) return { ...hotel, isBookmarked: value }
      return hotel
    })
    resolve(updatedHotels)
  })
}

export { getHotels, changeBookmark }
