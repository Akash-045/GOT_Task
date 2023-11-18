import { useState, useEffect } from "react";
import { getCharacters } from "../../services/gotService";
import { Link } from "react-router-dom";

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
const People = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getCharacters()
      .then((fetchedCharacters) => {
        if (fetchedCharacters) {
          setCharacters(fetchedCharacters as Character[]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch characters:", error);
      });
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Persons List</h2>
      <input
        type="text"
        placeholder="Search persons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCharacters.map((character) => (
        <div key={character.slug}>
          <h3>
            <Link to={`/people/${character.slug}`}>{character.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default People;
