var $b4te3$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useMouseDistance", function () { return $bce912ae94b2da34$export$d816d2e677ca69d7; });

function $bce912ae94b2da34$export$d816d2e677ca69d7() {
    const mousePosition = $bce912ae94b2da34$export$a26ddd37ee7e6f4a();
    const { elementPosition: elementPosition, elementRef: elementRef } = $bce912ae94b2da34$export$cb88b0f4a9b28a53();
    const [distance, setDistance] = (0, $b4te3$react.useState)(null);
    function calculateDistanceFromMouseToCenter() {
        if (elementPosition && mousePosition && mousePosition.x && mousePosition.y) {
            const { elementHorizontalCenter: elementHorizontalCenter, elementVerticalCenter: elementVerticalCenter } = $bce912ae94b2da34$export$9c7fff8fc5bf8420(elementPosition);
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
function $bce912ae94b2da34$export$a26ddd37ee7e6f4a() {
    const [mousePosition, setMousePosition] = (0, $b4te3$react.useState)({
        x: null,
        y: null
    });
    (0, $b4te3$react.useEffect)(()=>{
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
function $bce912ae94b2da34$export$cb88b0f4a9b28a53() {
    const elementRef = (0, $b4te3$react.useRef)(null);
    const [elementPosition, setElementPosition] = (0, $b4te3$react.useState)(null);
    const calculateElementPosition = (0, $b4te3$react.useCallback)(()=>{
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
    (0, $b4te3$react.useLayoutEffect)(()=>{
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
function $bce912ae94b2da34$export$9c7fff8fc5bf8420(element) {
    const horizontalCenterOffset = element.width / 2;
    const verticalCenterOffset = element.height / 2;
    const elementHorizontalCenter = element.left + horizontalCenterOffset;
    const elementVerticalCenter = element.top + verticalCenterOffset;
    return {
        elementHorizontalCenter: elementHorizontalCenter,
        elementVerticalCenter: elementVerticalCenter
    };
}




//# sourceMappingURL=main.js.map
