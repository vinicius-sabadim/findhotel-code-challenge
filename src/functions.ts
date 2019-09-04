import faker from 'faker'

import { Hotel } from './types'

function sortHotels(hotels: Hotel[], sortBy: string): Hotel[] {
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

function filterHotels(
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

export function getHotelsUsingCriteria(
  hotels: Hotel[],
  sortBy: string,
  distance: number,
  guestRating: number,
  maxPrice: number,
  starRating: Set<number>
): Hotel[] {
  const sortedHotels = sortHotels(hotels, sortBy)
  return filterHotels(sortedHotels, distance, guestRating, maxPrice, starRating)
}

function buildTag() {
  return faker.random.words(2)
}

function buildDeal(bestDealPrice: number = 20) {
  const price = faker.random.number({ min: bestDealPrice, max: 999 })
  const discount =
    price < 100
      ? 0
      : faker.random.boolean()
      ? faker.random.number({ min: 10, max: 99 })
      : 0

  return {
    partner: faker.internet.domainName(),
    url: faker.internet.url(),
    price,
    discount,
    hasFreeCancellation: faker.random.boolean()
  }
}

export function buildHotel(overrides: {} = {}): Hotel {
  const bestDeal = buildDeal()

  return {
    id: faker.random.uuid(),
    photo:
      'https://image.shutterstock.com/image-illustration/3d-render-luxury-hotel-room-600w-1446590612.jpg',
    title: faker.company.companyName(),
    starRating: faker.random.number({ min: 1, max: 5 }),
    guestRating: faker.finance.amount(0.1, 10, 1),
    isBookmarked: faker.random.boolean(),
    location: faker.random.number({ min: 20, max: 50000 }),
    tags: [buildTag(), buildTag(), buildTag(), buildTag(), buildTag()],
    deals: [
      bestDeal,
      buildDeal(bestDeal.price - bestDeal.discount),
      buildDeal(bestDeal.price - bestDeal.discount),
      buildDeal(bestDeal.price - bestDeal.discount)
    ],
    hasGreatDeal: faker.random.boolean(),
    ...overrides
  }
}
