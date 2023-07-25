import {useState as $6PEjo$useState, useEffect as $6PEjo$useEffect, useRef as $6PEjo$useRef, useCallback as $6PEjo$useCallback, useLayoutEffect as $6PEjo$useLayoutEffect} from "react";


function $09d553c8f27b034a$export$d816d2e677ca69d7() {
    const mousePosition = $09d553c8f27b034a$export$a26ddd37ee7e6f4a();
    const { elementPosition: elementPosition, elementRef: elementRef } = $09d553c8f27b034a$export$cb88b0f4a9b28a53();
    const [distance, setDistance] = (0, $6PEjo$useState)(null);
    function calculateDistanceFromMouseToCenter() {
        if (elementPosition && mousePosition && mousePosition.x && mousePosition.y) {
            const { elementHorizontalCenter: elementHorizontalCenter, elementVerticalCenter: elementVerticalCenter } = $09d553c8f27b034a$export$9c7fff8fc5bf8420(elementPosition);
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const distanceNew = {
                x: mousePosition.x + scrollX - elementHorizontalCenter,
                y: mousePosition.y + scrollY - elementVerticalCenter
            };
            if (JSON.stringify(distanceNew) !== JSON.stringify(distance)) setDistance(distanceNew);
        }
    }
    calculateDistanceFromMouseToCenter();
    const distanceSum = !distance ? null : Math.abs(distance.x) + Math.abs(distance.y);
    return {
        distance: distanceSum,
        elementRef: elementRef,
        distanceX: distance?.x ?? null,
        distanceY: distance?.y ?? null
    };
}
function $09d553c8f27b034a$export$a26ddd37ee7e6f4a() {
    const [mousePosition, setMousePosition] = (0, $6PEjo$useState)({
        x: null,
        y: null
    });
    (0, $6PEjo$useEffect)(()=>{
        function updateMousePosition(ev) {
            setMousePosition({
                x: ev.clientX,
                y: ev.clientY
            });
        }
        window.addEventListener("mousemove", updateMousePosition);
        return ()=>{
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);
    return mousePosition;
}
function $09d553c8f27b034a$export$cb88b0f4a9b28a53() {
    const elementRef = (0, $6PEjo$useRef)(null);
    const [elementPosition, setElementPosition] = (0, $6PEjo$useState)(null);
    const calculateElementPosition = (0, $6PEjo$useCallback)(()=>{
        if (elementRef.current) {
            const positionNew = elementRef.current.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const positionNewWithScrollOffset = {
                ...positionNew.toJSON(),
                left: positionNew.left + scrollX,
                top: positionNew.top + scrollY
            };
            if (JSON.stringify(positionNewWithScrollOffset) !== JSON.stringify(elementPosition)) setElementPosition(positionNewWithScrollOffset);
        }
    }, [
        elementPosition
    ]);
    // calculate on scroll
    (0, $6PEjo$useLayoutEffect)(()=>{
        window.addEventListener("scroll", calculateElementPosition);
        return ()=>{
            window.removeEventListener("scroll", calculateElementPosition);
        };
    }, [
        calculateElementPosition
    ]);
    calculateElementPosition();
    return {
        elementRef: elementRef,
        elementPosition: elementPosition
    };
}
function $09d553c8f27b034a$export$9c7fff8fc5bf8420(element) {
    const horizontalCenterOffset = element.width / 2;
    const verticalCenterOffset = element.height / 2;
    const elementHorizontalCenter = element.left + horizontalCenterOffset;
    const elementVerticalCenter = element.top + verticalCenterOffset;
    return {
        elementHorizontalCenter: elementHorizontalCenter,
        elementVerticalCenter: elementVerticalCenter
    };
}




export {$09d553c8f27b034a$export$d816d2e677ca69d7 as useMouseDistance};
//# sourceMappingURL=module.js.map
