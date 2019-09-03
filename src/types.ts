export type Deal = {
  partner: string
  url: string
  value: number
  discount: number | null
  hasFreeCancellation: boolean
}

export type Hotel = {
  id: number
  photo: string
  title: string
  starRating: number
  guestRating: number
  isBookmarked: boolean
  location: string
  tags: string[]
  deals: Deal[]
}
