import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

/**
 * Calculates the distance between an element and the mouse.
 *
 * @returns `elementRef` Element reference
 * @returns `distance` Sum of the absolute distance
 * @returns `distanceX` Horizontal distance. Can be negative.
 * @returns `distanceY` Vertical distance. Can be negative.
 */
export function useMouseDistance<TElementType extends HTMLElement>() {
  const mousePosition = useMousePosition()
  const { elementPosition, elementRef } = useElementPostition<TElementType>()

  const [distance, setDistance] = useState<{ x: number; y: number } | null>(
    null,
  )

  function calculateDistanceFromMouseToCenter() {
    if (
      elementPosition &&
      mousePosition &&
      mousePosition.x &&
      mousePosition.y
    ) {
      const { elementHorizontalCenter, elementVerticalCenter } =
        calculateElementCenters(elementPosition)

      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const distanceNew = {
        x: mousePosition.x + scrollX - elementHorizontalCenter,
        y: mousePosition.y + scrollY - elementVerticalCenter,
      }

      if (JSON.stringify(distanceNew) !== JSON.stringify(distance)) {
        setDistance(distanceNew)
      }
    }
  }

  calculateDistanceFromMouseToCenter()

  const distanceSum = !distance
    ? null
    : Math.abs(distance.x) + Math.abs(distance.y)

  return {
    distance: distanceSum,
    elementRef,
    distanceX: distance?.x ?? null,
    distanceY: distance?.y ?? null,
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
 * Returns an element ref and its position.
 * Also listens to the `scroll` event.
 */
export function useElementPostition<TElementType extends HTMLElement>() {
  const elementRef = useRef<TElementType | null>(null)
  const [elementPosition, setElementPosition] = useState<DOMRect | null>(null)

  const calculateElementPosition = useCallback(() => {
    if (elementRef.current) {
      const positionNew = elementRef.current.getBoundingClientRect()
      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const positionNewWithScrollOffset = {
        ...positionNew.toJSON(),
        left: positionNew.left + scrollX,
        top: positionNew.top + scrollY,
      }
      console.log('NEw:', positionNewWithScrollOffset)
      console.log('ele :', elementPosition)

      if (
        JSON.stringify(positionNewWithScrollOffset) !==
        JSON.stringify(elementPosition)
      ) {
        setElementPosition(positionNewWithScrollOffset)
      }
    }
  }, [elementPosition])

  // calculate on scroll
  useLayoutEffect(() => {
    window.addEventListener('scroll', calculateElementPosition)

    return () => {
      window.removeEventListener('scroll', calculateElementPosition)
    }
  }, [calculateElementPosition])

  calculateElementPosition()

  return { elementRef, elementPosition }
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
