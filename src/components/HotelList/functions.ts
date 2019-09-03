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

export function filterHotels(
  hotels: Hotel[],
  guestRating: number,
  starRating: Set<number>
): Hotel[] {
  const filteredByGuestRating = hotels.filter(
    hotel => parseFloat(hotel.guestRating) >= guestRating
  )
  const filteredByStarRating = filteredByGuestRating.filter(hotel => {
    if (starRating.size === 0) return true
    return starRating.has(hotel.starRating)
  })

  return filteredByStarRating
}
