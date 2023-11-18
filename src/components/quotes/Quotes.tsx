import React, { useState, useEffect } from "react";
import { getQuotes } from "../../services/gotService";

type QuoteCharacter = {
  name: string;
  slug: string;
  house: {
    name: string;
    slug: string;
  };
};

type Quote = {
  sentence: string;
  character: QuoteCharacter;
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [displayQuotes, setDisplayQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    getQuotes()
      .then((fetchedQuotes) => {
        if (fetchedQuotes) {
          setQuotes(fetchedQuotes as Quote[]);
          setDisplayQuotes(selectRandomQuotes(fetchedQuotes, 5));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch quotes:", error);
      });
  }, []);

  const selectRandomQuotes = (
    quotesArray: Quote[],
    number: number
  ): Quote[] => {
    return quotesArray.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  const refreshQuotes = () => {
    setDisplayQuotes(selectRandomQuotes(quotes, 5));
  };

  return (
    <div>
      <h2>Quotes</h2>
      {displayQuotes.map((quote, index) => (
        <div key={index}>
          <p>
            "{quote.sentence}" - {quote.character.name},{" "}
            {quote.character.house.name}
          </p>
        </div>
      ))}
      <button onClick={refreshQuotes}>Show Other Quotes</button>
    </div>
  );
};

export default Quotes;
