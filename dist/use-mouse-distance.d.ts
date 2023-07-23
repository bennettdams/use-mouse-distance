/// <reference types="react" />
/**
 * Calculates the distance between an element and the mouse.
 *
 * @returns `elementRef` Element reference
 * @returns `distance` Sum of the distance (absolute number)
 * @returns `distanceX` Horizontal distance. Can be negative.
 * @returns `distanceY` Vertical distance. Can be negative.
 *
 * @example
 * ```tsx
 * import { useMouseDistance } from 'use-mouse-distance'
 *
 * function MyComponent() {
 *   const { elementRef, distance, distanceX, distanceY } =
 *     useMouseDistance<HTMLDivElement>()
 *
 *   return (
 *     <div>
 *       <div ref={elementRef}>
 *         <p>Distance sum (absolute): {distance}</p>
 *         <p>Distance x: {distanceX}</p>
 *         <p>Distance y: {distanceY}</p>
 *       </div>
 *     </div>
 *   )
 * }
 * ```
 *
 */
export declare function useMouseDistance<TElementType extends HTMLElement>(): {
    distance: number | null;
    elementRef: import("react").MutableRefObject<TElementType | null>;
    distanceX: number | null;
    distanceY: number | null;
};
/**
 * Returns the current `x` and `y` position of the mouse. Updates via the `mousemove` event.
 */
export declare function useMousePosition(): {
    x: number | null;
    y: number | null;
};
/**
 * Returns an element ref and its position.
 * Also listens to the `scroll` event.
 */
export declare function useElementPostition<TElementType extends HTMLElement>(): {
    elementRef: import("react").MutableRefObject<TElementType | null>;
    elementPosition: DOMRect | null;
};
/**
 * Calculates the horizontal and vertical center of an element.
 *
 * Takes the `DOMRect` of an element, e.g. from `getBoundingClientRect()`.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 */
export declare function calculateElementCenters(element: DOMRect): {
    elementHorizontalCenter: number;
    elementVerticalCenter: number;
};
