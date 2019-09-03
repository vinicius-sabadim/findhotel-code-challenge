export type Deal = {
  partner: string
  url: string
  price: number
  discount: number
  hasFreeCancellation: boolean
}

export type Hotel = {
  id: string
  photo: string
  title: string
  starRating: number
  guestRating: string
  isBookmarked: boolean
  location: number
  tags: string[]
  deals: Deal[]
  hasGreatDeal: boolean
}
