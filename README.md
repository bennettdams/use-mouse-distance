<h1 style="text-align: center;">use-mouse-distance 🐭📏</h1>

A React hook that measures the distance from an element's center to the user's mouse.

## Installation

```
npm install use-mouse-distance
```

## Usage

Use the hook to receive an element reference and the distance to that element's center.

```tsx
import { useMouseDistance } from 'use-mouse-distance'

function MyComponent() {
  const { elementRef, distance, distanceX, distanceY } =
    useMouseDistance<HTMLDivElement>()

  return (
    <div>
      <div ref={elementRef}>
        <p>Distance sum (absolute): {distance}</p>
        <p>Distance x: {distanceX}</p>
        <p>Distance y: {distanceY}</p>
      </div>
    </div>
  )
}
```

## API

| Return field | Description                                        |
| ------------ | -------------------------------------------------- |
| `elementRef` | Element reference                                  |
| `distance`   | Sum of the distance to the mouse (absolute number) |
| `distanceX`  | Horizontal distance (can be negative)              |
| `distanceY`  | Vertical distance (can be negative)                |
