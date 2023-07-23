import { useCallback, useEffect, useLayoutEffect, useRef, useState, } from 'react';
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
export function useMouseDistance() {
    var _a, _b;
    const mousePosition = useMousePosition();
    const { elementPosition, elementRef } = useElementPostition();
    const [distance, setDistance] = useState(null);
    function calculateDistanceFromMouseToCenter() {
        if (elementPosition &&
            mousePosition &&
            mousePosition.x &&
            mousePosition.y) {
            const { elementHorizontalCenter, elementVerticalCenter } = calculateElementCenters(elementPosition);
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const distanceNew = {
                x: mousePosition.x + scrollX - elementHorizontalCenter,
                y: mousePosition.y + scrollY - elementVerticalCenter,
            };
            if (JSON.stringify(distanceNew) !== JSON.stringify(distance)) {
                setDistance(distanceNew);
            }
        }
    }
    calculateDistanceFromMouseToCenter();
    const distanceSum = !distance
        ? null
        : Math.abs(distance.x) + Math.abs(distance.y);
    return {
        distance: distanceSum,
        elementRef,
        distanceX: (_a = distance === null || distance === void 0 ? void 0 : distance.x) !== null && _a !== void 0 ? _a : null,
        distanceY: (_b = distance === null || distance === void 0 ? void 0 : distance.y) !== null && _b !== void 0 ? _b : null,
    };
}
/**
 * Returns the current `x` and `y` position of the mouse. Updates via the `mousemove` event.
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    });
    useEffect(() => {
        function updateMousePosition(ev) {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        }
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
}
/**
 * Returns an element ref and its position.
 * Also listens to the `scroll` event.
 */
export function useElementPostition() {
    const elementRef = useRef(null);
    const [elementPosition, setElementPosition] = useState(null);
    const calculateElementPosition = useCallback(() => {
        if (elementRef.current) {
            const positionNew = elementRef.current.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const positionNewWithScrollOffset = Object.assign(Object.assign({}, positionNew.toJSON()), { left: positionNew.left + scrollX, top: positionNew.top + scrollY });
            if (JSON.stringify(positionNewWithScrollOffset) !==
                JSON.stringify(elementPosition)) {
                setElementPosition(positionNewWithScrollOffset);
            }
        }
    }, [elementPosition]);
    // calculate on scroll
    useLayoutEffect(() => {
        window.addEventListener('scroll', calculateElementPosition);
        return () => {
            window.removeEventListener('scroll', calculateElementPosition);
        };
    }, [calculateElementPosition]);
    calculateElementPosition();
    return { elementRef, elementPosition };
}
/**
 * Calculates the horizontal and vertical center of an element.
 *
 * Takes the `DOMRect` of an element, e.g. from `getBoundingClientRect()`.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 */
export function calculateElementCenters(element) {
    const horizontalCenterOffset = element.width / 2;
    const verticalCenterOffset = element.height / 2;
    const elementHorizontalCenter = element.left + horizontalCenterOffset;
    const elementVerticalCenter = element.top + verticalCenterOffset;
    return { elementHorizontalCenter, elementVerticalCenter };
}
