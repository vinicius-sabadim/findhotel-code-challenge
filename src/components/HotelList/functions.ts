import { Hotel } from '../../types'

export function sortHotels(hotels: Hotel[], sortBy: string): Hotel[] {
  if (sortBy === 'best') {
    return hotels.reduce<Hotel[]>((acc, hotel) => {
      if (hotel.hasGreatDeal) return [hotel, ...acc]
      return [...acc, hotel]
    }, [])
  }
  return hotels.sort((prevHotel, hotel) => {
    const prevHotelValue =
      prevHotel.deals[0].value - prevHotel.deals[0].discount
    const hotelValue = hotel.deals[0].value - hotel.deals[0].discount
    if (hotelValue < prevHotelValue) return 1
    return -1
  })
}
