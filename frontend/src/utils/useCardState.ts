import { Dispatch, useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { useDebounce } from "./useDebounce";

export const card = atom({
  key: "card",
  default: JSON.parse(localStorage.getItem("card") || "{}"),
});

export const useCardLocalStorage = <T = any>(
  mainKey: string,
  key: string,
  initialValue?: T
): [T, Dispatch<T>] => {
  const [recoilItem, setRecoilItem] = useRecoilState(card);

  const [item, setValue] = useState<T>(() => {
    const mainDict = JSON.parse(localStorage.getItem("card") || "{}");
    let value = mainDict[key] || initialValue || null;
    if (typeof initialValue === "string" && value === null) {
      value = "";
    }
    mainDict[key] = value;
    setRecoilItem(mainDict);
    localStorage.setItem("card", JSON.stringify(mainDict));
    return value;
  });

  useEffect(() => {
    const mainDict = JSON.parse(localStorage.getItem("card") || "{}");
    mainDict[key] = item;
    setRecoilItem(mainDict);
    localStorage.setItem("card", JSON.stringify(mainDict));
  }, [item, key]);

  return [item, setValue];
};
