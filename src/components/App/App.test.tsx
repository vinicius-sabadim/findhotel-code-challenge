import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import { isSorted } from '../../helpers'

import App from './App'

test('should change the list when sorting by lowest price', async () => {
  const { getByText, getByLabelText, getAllByRole, getByTestId } = render(
    <App />
  )
  await wait(() => getByTestId('hotel-list'))
  fireEvent.click(
    getByText(/sort by/i, {
      selector: 'button'
    })
  )
  fireEvent.click(getByLabelText(/lowest price/i))
  const hotels = getAllByRole('listitem')
  const hotelPrices = hotels
    .map(el => el.querySelector('.bestDeal__finalValue'))
    .map(el => parseInt(el!.textContent!.replace('€', '')))

  expect(isSorted(hotelPrices)).toBeTruthy()
})
