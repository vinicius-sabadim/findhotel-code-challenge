import faker from 'faker'

import { Hotel } from './types'

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
    guestRating: faker.finance.amount(6, 10, 1),
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
