import { useEffect, useState } from 'react'

/**
 * Test!
 */
export function useMouseDistance() {
  const [count, setCount] = useState<number>(0)

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  return {
    count,
    increment,
  }
}

/**
 * Returns the current `x` and `y` position of the mouse. Updates via the `mousemove` event.
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{
    x: number | null
    y: number | null
  }>({
    x: null,
    y: null,
  })

  useEffect(() => {
    function updateMousePosition(ev: MouseEvent) {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

/**
 * Calculates the horizontal and vertical center of an element.
 *
 * Takes the `DOMRect` of an element, e.g. from `getBoundingClientRect()`.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 */
export function calculateElementCenters(element: DOMRect) {
  const horizontalCenterOffset = element.width / 2
  const verticalCenterOffset = element.height / 2

  const elementHorizontalCenter = element.left + horizontalCenterOffset
  const elementVerticalCenter = element.top + verticalCenterOffset

  return { elementHorizontalCenter, elementVerticalCenter }
}
