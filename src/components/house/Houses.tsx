import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHouses } from "../../services/gotService";

type House = {
  slug: string;
  name: string;
  members: { name: string; slug: string }[];
};

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getHouses()
      .then((fetchedhouses) => {
        if (fetchedhouses) {
          setHouses(fetchedhouses as House[]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch houses:", error);
      });
  }, []);

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="houses-container">
        <h2 className="house-title">Houses List</h2>
        <input
          type="text"
          placeholder="Search houses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredHouses.map((house) => (
          <div key={house.slug}>
            <Link to={`/houses/${house.slug}`}>{house.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
