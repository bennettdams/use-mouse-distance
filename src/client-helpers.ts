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
