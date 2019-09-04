import { Hotel } from '../../../types'

export function getHeight(maxValue: number, current: number): string {
  const value = (current * 100) / maxValue
  return `${value}%`
}

export function getDistribution(hotels: Hotel[], criteria: string) {
  if (criteria === 'price') {
    return hotels.reduce<Array<number>>((acc, hotel) => {
      const index = Math.floor(
        (hotel.deals[0].price - hotel.deals[0].discount) / 100
      )
      acc[index] = acc[index] + 1
      return acc
    }, Array(10).fill(0))
  } else if (criteria === 'guest') {
    // The rating 10 should be in the 9th index
    return hotels.reduce<Array<number>>((acc, hotel) => {
      const rating = parseFloat(hotel.guestRating)
      const index = rating === 10 ? 9 : Math.floor(rating)
      acc[index] = acc[index] + 1
      return acc
    }, Array(10).fill(0))
  }

  // This 5500 is because the max location value is 55000
  return hotels.reduce<Array<number>>((acc, hotel) => {
    const index = Math.floor(hotel.location / 5500)
    acc[index] = acc[index] + 1
    return acc
  }, Array(10).fill(0))
}
