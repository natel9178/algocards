import { Dispatch, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { card } from "./useCardState";
import { useDebounce } from "./useDebounce";

export const useLocalStorage = <T = any>(
  key: string,
  initialValue?: T
): [T, Dispatch<T>] => {
  const [item, setValue] = useState<T>(() => {
    const value =
      localStorage.getItem(key) || JSON.stringify(initialValue || null);
    localStorage.setItem(key, value);
    return JSON.parse(value);
  });
  const debouncedItem = useDebounce(item, 1000);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(debouncedItem));
  }, [debouncedItem, key]);

  return [item, setValue];
};
