import { useEffect, useState } from "react";
import { Spec } from "../spec/spec";

export default function useFetchCard(link: string) {
  const [cardData, setCardData] = useState<Spec | null>(null);

  useEffect(() => {
    if (link === "") {
      return;
    }

    const parsedLink = `/external/${link}`;
    fetch(parsedLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => setCardData(data));
  }, [link]);

  return cardData;
}
