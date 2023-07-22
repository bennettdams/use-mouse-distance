import { describe, expect, it } from 'vitest'

import { calculateElementCenters } from '../src/client-helpers'

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
