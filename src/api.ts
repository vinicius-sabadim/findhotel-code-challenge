import { Hotel } from './types'

import hotels from './hotels.json'

const getHotels = (): Promise<Hotel[]> => {
  // Simulating the delay of an api call
  return new Promise(resolve => setTimeout(() => resolve(hotels), 1000))
}

const changeBookmark = (id: number, value: boolean): void => {}

export { getHotels, changeBookmark }
