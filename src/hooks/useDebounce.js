import { useState, useEffect } from "react";

/**
 * A custom hook that delays updating a value until a set time has passed.
 * Prevents "expensive" operations (like filtering) from running on every keystroke.
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancels the timeout if the value changes before delay is over
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
