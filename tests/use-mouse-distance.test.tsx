import userEvent from '@testing-library/user-event'
import React, { MutableRefObject } from 'react'
import { expect, expectTypeOf } from 'vitest'
import { useMouseDistance } from '../dist/use-mouse-distance'

import { render, renderHook, screen } from '@testing-library/react'
import {
  calculateElementCenters,
  useElementPostition,
  useMousePosition,
} from '../src/use-mouse-distance'

describe(`Function ${useMouseDistance.name}`, () => {
  it('returns the correct type', () => {
    const { result } = renderHook(() => useMouseDistance<HTMLDivElement>())

    expect(result.current).toBeDefined()

    expectTypeOf(result.current).toEqualTypeOf<{
      distance: number | null
      elementRef: MutableRefObject<HTMLDivElement | null>
      distanceX: number | null
      distanceY: number | null
    }>()
  })
})

describe(`Function ${calculateElementCenters.name}`, () => {
  it('calculates the correct center of an element', () => {
    const elementWidth = 300
    const elementHeight = 400

    const result = calculateElementCenters(
      createDomRect({ x: 0, y: 0, width: elementWidth, height: elementHeight }),
    )

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

describe(`Function ${useElementPostition.name}`, () => {
  it('returns the correct type', () => {
    const { result } = renderHook(() => useElementPostition())

    expect(result.current).toBeDefined()

    expectTypeOf(result.current).toEqualTypeOf<{
      elementRef: MutableRefObject<HTMLElement | null>
      elementPosition: DOMRect | null
    }>()
  })

  it('gives the current element position', async () => {
    function Wrapper() {
      const { elementRef, elementPosition } =
        useElementPostition<HTMLDivElement>()

      const domRect = createDomRect({ x: 0, y: 0, width: 100, height: 200 })

      window.HTMLElement.prototype.getBoundingClientRect = () =>
        ({
          ...domRect,
          toJSON() {
            return {
              domRect,
            }
          },
        }) as DOMRect

      return (
        <div>
          <div
            style={{ marginLeft: '100px', width: 400, height: 200 }}
            ref={elementRef}
          >
            <p>Position x: {elementPosition?.x}</p>
            <p>Position y: {elementPosition?.y}</p>
          </div>
        </div>
      )
    }

    render(<Wrapper />)

    await userEvent.hover(screen.getByText('Position x:'))

    expect(screen.getByText('Position x:'))
    expect(screen.getByText('Position y:'))
  })
})

function createDomRect({
  x,
  y,
  width,
  height,
}: {
  x: number
  y: number
  width: number
  height: number
}) {
  return {
    x,
    y,
    width,
    height,
    top: y,
    bottom: y + height,
    left: x,
    right: x + width,
  } as unknown as DOMRect
}
