import { useEffect, useState } from "react";

export default function useFetchCard(link: string) {
  const [cardData, setCardData] = useState({});

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
