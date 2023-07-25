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
export function useMouseDistance<TElementType extends HTMLElement>(): {
    distance: number | null;
    elementRef: import("react").MutableRefObject<TElementType | null>;
    distanceX: number | null;
    distanceY: number | null;
};

//# sourceMappingURL=types.d.ts.map
