import { useState } from "react";

export function useLocalStorage(id: string | undefined, initialValue: {}) {
  // The 'id' passed here is the literal key in localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = id && window.localStorage.getItem(id);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: {}) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      id && window.localStorage.setItem(id, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
