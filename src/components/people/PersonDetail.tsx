import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails } from "../../services/gotService";


type CharacterHouse = {
  slug: string;
  name: string;
};

type Character = {
  name: string;
  slug: string;
  house: CharacterHouse | null;
  quotes: string[];
};

const PersonDetail = () => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const [person, setPerson] = useState<Character | null>(null);
  const [displayedQuotes, setDisplayedQuotes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacterDetails();
      if (characters) {
        const foundCharacter = characters.find(
          (char: { slug: string | undefined }) => char.slug === personSlug
        );
        if (foundCharacter) {
          setPerson(foundCharacter);
          setDisplayedQuotes(foundCharacter.quotes.slice(0, 5)); // Display first 5 quotes initially
        }
      }
    };

    fetchCharacters();
  }, [personSlug]);

  const refreshQuotes = () => {
    if (person && person.quotes.length > 0) {
      const shuffledQuotes = [...person.quotes].sort(() => 0.5 - Math.random());
      setDisplayedQuotes(shuffledQuotes.slice(0, 5)); // Update with a new set of 5 quotes
    }
  };
  return (
    <div>
      <h2>Person Details</h2>
      {person ? (
        <>
          <h3>{person.name}</h3>
          {person.house && <p>House: {person.house.name}</p>}
          <p>Quotes:</p>
          <ul>
            {displayedQuotes.map((quote, index) => (
              <li key={index}>{quote}</li>
            ))}
          </ul>
          <button onClick={refreshQuotes}>Refresh Quotes</button>
        </>
      ) : (
        <p>Loading person details...</p>
      )}
    </div>
  );
};
export default PersonDetail;
