export const getGuestRatingText = (value: number): string => {
  if (value > 9) return 'Awesome'
  if (value > 8) return 'Fabulous'
  if (value > 7) return 'Very Good'
  return 'Good'
}

export const getGuestRatingColor = (value: number): string => {
  if (value > 9) return '#00915e'
  if (value > 8) return '#06b679'
  if (value > 7) return '#f7ca18'
  return '#ff8300'
}

export const formatLocation = (value: number): string => {
  if (value < 1000) return `${value} m`
  return `${Math.floor(value / 1000)} km`
}
