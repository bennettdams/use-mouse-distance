import { expect, expectTypeOf, test } from 'vitest'
import { useMouseDistance } from '../dist/use-mouse-distance'

import { act, renderHook } from '@testing-library/react'

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
