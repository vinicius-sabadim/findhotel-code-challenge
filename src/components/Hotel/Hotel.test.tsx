import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import { AppProvider } from '../../app-context'
import { buildHotel } from '../../functions'

import Hotel from './Hotel'

import { changeBookmark } from '../../api'

const mockChangeBookmark = changeBookmark as jest.Mock<any>

jest.mock('../../api', () => {
  return {
    changeBookmark: jest.fn()
  }
})

test('should change the list when sorting by lowest price', async () => {
  const hotel = buildHotel({
    id: '12345',
    isBookmarked: false
  })

  const { getByTestId } = render(
    <AppProvider>
      <Hotel hotel={hotel} />
    </AppProvider>
  )

  await wait(() => fireEvent.click(getByTestId('bookmark')))
  expect(mockChangeBookmark).toHaveBeenCalledTimes(1)
  expect(mockChangeBookmark).toHaveBeenCalledWith(hotel.id, !hotel.isBookmarked)
})
