export const getGuestRatingText = (value: number): string => {
  if (value < 8) return 'Very Good'
  if (value < 9) return 'Fabulous'
  if (value < 10) return 'Awesome'
  return 'Good'
}

export const getGuestRatingColor = (value: number): string => {
  if (value < 8) return '#f7ca18'
  if (value < 9) return '#06b679'
  if (value < 10) return '#00915e'
  return '#ff8300'
}
