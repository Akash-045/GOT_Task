const HOUSE_BASE_URL = " https://api.gameofthronesquotes.xyz/v1/houses";
const CHARACTERS_BASE_URL = "https://api.gameofthronesquotes.xyz/v1/characters";
const QUOTES_BASE_URL = "https://api.gameofthronesquotes.xyz/v1/random/5";

export const getHouses = async () => {
  try {
    const response = await fetch(`${HOUSE_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch houses:", error);
  }
};

export const getHouseBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `https://api.gameofthronesquotes.xyz/v1/house/${slug}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch house details:", error);
  }
};

export const getCharacters = async () => {
  try {
    const response = await fetch(`${CHARACTERS_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch characters:", error);
  }
};

export const getCharacterDetails = async () => {
  try {
    const response = await fetch(
      "https://api.gameofthronesquotes.xyz/v1/characters"
    ); 
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch character details for slug", error);
  }
};

export const getQuotes = async () => {
  try {
    const response = await fetch(`${QUOTES_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch quotes:", error);
  }
};
