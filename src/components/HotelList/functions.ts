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
      prevHotel.deals[0].price - prevHotel.deals[0].discount
    const hotelValue = hotel.deals[0].price - hotel.deals[0].discount
    if (hotelValue < prevHotelValue) return 1
    return -1
  })
}

export function filterHotels(
  hotels: Hotel[],
  distance: number,
  guestRating: number,
  maxPrice: number,
  starRating: Set<number>
): Hotel[] {
  return hotels
    .filter(hotel => hotel.location <= distance)
    .filter(hotel => parseFloat(hotel.guestRating) >= guestRating)
    .filter(hotel => hotel.deals[0].price - hotel.deals[0].discount <= maxPrice)
    .filter(hotel => {
      if (starRating.size === 0) return true
      return starRating.has(hotel.starRating)
    })
}
