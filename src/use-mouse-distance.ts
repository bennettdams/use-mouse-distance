import { useState } from 'react'

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
