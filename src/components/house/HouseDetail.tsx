import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHouseBySlug } from "../../services/gotService";

type House = {
  slug: string;
  name: string;
  members: { name: string; slug: string }[];
};

const HouseDetail = () => {
  const { houseSlug } = useParams<{ houseSlug: string }>();
  const [house, setHouse] = useState<House | null>(null);

  useEffect(() => {
    if (houseSlug) {
      getHouseBySlug(houseSlug)
        .then((data) => {
          if (data) {
            setHouse(data[0] as House);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch house details:", error);
        });
    }
  }, [houseSlug]);

  return (
    <div>
      <h2>{house?.name}</h2>
      <ul>
        {house?.members.map((member) => (
          <li key={member.slug}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HouseDetail;
