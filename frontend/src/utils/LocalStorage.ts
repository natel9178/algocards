import { useState } from "react";

export function useLocalStorage<T = any>(key: string, initialValue?: T) {
  const [item, setValue] = useState<T>(() => {
    const value =
      localStorage.getItem(key) || JSON.stringify(initialValue || null);
    localStorage.setItem(key, value);
    return JSON.parse(value);
  });

  function setItem(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [item, setItem];
}
