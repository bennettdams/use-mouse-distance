import userEvent from '@testing-library/user-event'
import React from 'react'
import { expect, expectTypeOf, test } from 'vitest'
import { useMouseDistance } from '../dist/use-mouse-distance'

import { act, render, renderHook, screen } from '@testing-library/react'
import {
  calculateElementCenters,
  useMousePosition,
} from '../src/use-mouse-distance'

test('test', () => {
  const { result } = renderHook(() => useMouseDistance())

  expectTypeOf({ count: result.current.count }).toEqualTypeOf<{
    count: number
  }>()
  expectTypeOf({ increment: result.current.increment }).toEqualTypeOf<{
    increment: () => void
  }>()

  expect(result.current.count).toEqual(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toEqual(1)
})

describe(`Function ${calculateElementCenters.name}`, () => {
  it('calculates the correct center of an element', () => {
    const elementWidth = 300
    const elementHeight = 400

    const result = calculateElementCenters({
      width: elementWidth,
      height: elementHeight,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      x: 0,
      y: 0,
      toJSON() {
        return null
      },
    })

    expect(result).toBeDefined()
    expect(result.elementHorizontalCenter).toEqual(elementWidth / 2)
    expect(result.elementVerticalCenter).toEqual(elementHeight / 2)
  })
})

describe(`Function ${useMousePosition.name}`, () => {
  it('returns the correct type', () => {
    const { result } = renderHook(() => useMousePosition())

    expect(result.current).toBeDefined()

    expectTypeOf(result.current).toEqualTypeOf<{
      x: number | null
      y: number | null
    }>()
  })

  it('gives the current mouse position', async () => {
    // TODO Can you emulate real mouse positioning with Testing Library? Right now, we can only check for the 0 coordinates here.

    const elementTarget = 'custom-element-id'
    const user = userEvent.setup()

    function Wrapper() {
      const mousePosition = useMousePosition()

      return (
        <div>
          <div>
            <p>Position x: {mousePosition.x ?? ''}</p>
            <p>Position y: {mousePosition.y ?? ''}</p>
          </div>

          <div>{elementTarget}</div>
        </div>
      )
    }

    render(<Wrapper />)

    expect(screen.getByText('Position x:'))
    expect(screen.getByText('Position y:'))

    await user.hover(screen.getByText(elementTarget))

    expect(screen.getByText('Position x: 0'))
    expect(screen.getByText('Position y: 0'))
  })
})
